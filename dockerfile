# backend/Dockerfile
# Multi-stage build: build assets & vendors, then produce a small runtime image

# ----- Stage 1: Node (build frontend assets) -----
FROM node:18-alpine AS node_builder
WORKDIR /srv/frontend
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# ----- Stage 2: Composer (install PHP deps) -----
FROM composer:2 AS vendor_builder
WORKDIR /srv/app
COPY composer.json composer.lock ./ 
RUN composer install --no-dev --no-scripts --prefer-dist --no-interaction --optimize-autoloader

# ----- Stage 3: PHP runtime (final image) -----
FROM php:8.2-fpm-alpine

# system deps and php extensions commonly needed for Laravel + MySQL
RUN apk add --no-cache \     
      curl \
      libpng-dev \
      libjpeg-turbo-dev \
      libwebp-dev \
      libxpm-dev \
      libzip-dev \
      nodejs npm \
      oniguruma-dev \
      openrc \
      mysql-client \
    && docker-php-ext-configure gd --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) pdo_mysql gd mbstring zip exif pcntl bcmath \
    \
    # Build dependencies for PECL redis
    && apk add --no-cache --virtual .build-deps $PHPIZE_DEPS linux-headers openssl-dev \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del .build-deps

WORKDIR /var/www/html

# copy application source
COPY --exclude=frontend . ./

# copy composer vendor from vendor_builder
COPY --from=vendor_builder /srv/app/vendor ./vendor

# copy frontend build into public/
# adjust path if your frontend build folder differs (dist, build)
COPY --from=node_builder /srv/frontend/dist ./public

# copy entrypoint & nginx config
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY docker/nginx.conf /etc/nginx/nginx.conf

RUN chmod +x /usr/local/bin/entrypoint.sh

# set permissions for Laravel storage & bootstrap
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# expose http port
EXPOSE 80

# default env (can be overridden in compose)
ENV APP_ENV=production \
    APP_DEBUG=false \
    APP_URL=http://localhost \
    # default DB host set by compose
    DB_HOST=db \
    DB_PORT=3306

ENTRYPOINT ["entrypoint.sh"]
CMD ["php-fpm"]