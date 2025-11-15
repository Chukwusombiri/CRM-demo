#!/bin/sh
set -e

# Wait for MySQL to be ready
echo "[entrypoint] waiting for database at ${DB_HOST:-db}:${DB_PORT:-3306}..."
retries=0
until nc -z ${DB_HOST:-db} ${DB_PORT:-3306}; do
  retries=$((retries+1))
  if [ $retries -ge 60 ]; then
    echo "[entrypoint] database did not become available in time"
    exit 1
  fi
  sleep 1
done
echo "[entrypoint] database is available"

# Run migrations only if no migrations table exists (idempotent check)
# We use `php artisan migrate:status` to see if any migrations have been run.
# The script assumes artisan is configured and DB credentials are present.
if php artisan migrate:status --no-ansi --no-interaction | grep -q "No migrations found"; then
  echo "[entrypoint] No migrations found; running migrations..."
  php artisan migrate --force
else
  # If migrate:status returns a list, we'll still check if any applied migrations exist.
  if php artisan migrate:status --no-ansi --no-interaction | grep -q "No"; then
    echo "[entrypoint] Some migrations not yet applied; running migrations..."
    php artisan migrate --force
  else
    echo "[entrypoint] Migrations already applied; skipping."
  fi
fi

# Clear & cache (optional)
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

# Start php-fpm in background and nginx in foreground
echo "[entrypoint] starting php-fpm..."
php-fpm -D

echo "[entrypoint] starting nginx..."
exec nginx -g "daemon off;"
