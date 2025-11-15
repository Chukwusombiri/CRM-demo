# React + Laravel CRM Application

A Demo Customer Relationship Management (CRM) application built with React frontend and Laravel backend, containerized with Docker for easy deployment.

## 🚀 Features

- **Frontend**: React with Vite build system
- **Backend**: Laravel PHP framework
- **Database**: MySQL 8.0
- **Web Server**: Nginx
- **Database Management**: Adminer included
- **Containerized**: Full Docker support

## 📋 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- Git

## 🛠 Quick Start (Development)

### 1. Clone and Setup
```bash
git clone <your-repository>
cd react-laravel-crm
```

### 2. Environment Configuration
```bash
# Copy environment file
cp .env.example .env

# Generate Laravel application key
docker compose run --rm api php artisan key:generate
```

### 3. Start the Application
```bash
# Build and start all services
docker compose up --build -d

# View logs
docker compose logs -f
```

### 4. Application Access
Frontend Application: http://localhost:5000

Adminer (Database GUI): http://localhost:8080

API Endpoints: http://localhost:5000/api/*

## 🏗 Project Structure
text
react-laravel-crm/
├── frontend/                 # React frontend application
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── docker/
│   └── nginx.conf           # Nginx configuration
├── Dockerfile               # Multi-stage build configuration
├── docker-compose.yaml      # Service orchestration
├── .env.example             # Environment variables template
└── README.md


## 🐳 Docker Services
Service	Port	Description	Container Name
webserver	5000	Nginx web server	reactLaravelCRM-webserver
api	9000	Laravel PHP-FPM API	reactLaravelCRM-api
db	3307	MySQL 8.0 database	reactLaravelCRM_db
adminer	8080	Database management	reactLaravelCRM-adminer

## 🔧 Production Deployment
### 1. Server Preparation
```bash
# Install Docker on your server
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
``` 

### 2. Application Deployment
```bash
# Clone your project
git clone <your-repository>
cd react-laravel-crm

# Create production environment file
cp .env.example .env
nano .env  # Edit with production values
```

### 3. Production Environment Variables
Update .env with production values:

env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=reactLaravelCRM_db
DB_USERNAME=app_user
DB_PASSWORD=strong_production_password

# Generate a secure app key
APP_KEY=base64:...

### 4. Database Setup
```bash
# Run database migrations
docker compose run --rm api php artisan migrate --force

# Seed initial data (if needed)
docker compose run --rm api php artisan db:seed --force
```

### 5. Storage Permissions
```bash
# Ensure storage permissions are correct
docker compose run --rm api chmod -R 775 storage
docker compose run --rm api chown -R www-data:www-data storage
```

### 6. Start Production Services
```bash
# Build and start in detached mode
docker compose up --build -d

# Verify all services are running
docker compose ps
```

### 7. SSL/HTTPS Setup (Recommended)
Use a reverse proxy like Nginx or Traefik:

```nginx
# Example nginx reverse proxy config
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🔄 Common Operations
Database Management
```bash
# Run migrations
docker compose run --rm api php artisan migrate

# Rollback migrations
docker compose run --rm api php artisan migrate:rollback

# Access MySQL console
docker compose exec db mysql -u app_user -p reactLaravelCRM_db
```

## Application Maintenance
```bash
# View logs
docker compose logs api
docker compose logs webserver

# Restart services
docker compose restart api
docker compose restart webserver

# Stop all services
docker compose down

# Stop and remove volumes (warning: deletes data)
docker compose down -v
Development Commands
bash
# Run Laravel commands
docker compose run --rm api php artisan [command]

# Run npm commands in frontend (if needed)
cd frontend && npm install && npm run dev

# Clear application cache
docker compose run --rm api php artisan cache:clear
docker compose run --rm api php artisan config:clear
docker compose run --rm api php artisan route:clear
```

## 🛡 Security Considerations
Production Security Checklist
- Change all default passwords in .env

- Set APP_DEBUG=false in production

- Use strong APP_KEY

- Enable HTTPS with SSL certificates

- Regularly update Docker images

- Configure firewall rules

- Set up regular backups

- Monitor container logs

## Database Security
```bash
# Regular backups
docker compose exec db mysqldump -u app_user -p reactLaravelCRM_db > backup_$(date +%Y%m%d).sql

# Restore from backup
docker compose exec -i db mysql -u app_user -p reactLaravelCRM_db < backup_file.sql
```

## 🔍 Troubleshooting
Common Issues
- Containers not starting:

```bash
# Check container status
docker compose ps

# View detailed logs
docker compose logs [service-name]
```

- Database connection issues:

```bash
# Check if database is running
docker compose ps db

# Test database connection
docker compose exec db mysql -u app_user -p
```

- Permission errors:

```bash
# Fix storage permissions
docker compose run --rm api chmod -R 775 storage bootstrap/cache
```

- Port conflicts:

Change ports in docker-compose.yaml if 5000, 8080, or 3307 are already in use

## 📞 Support
For issues and questions:

- Check the troubleshooting section above

- Review Docker and container logs

- Ensure all environment variables are properly set

- Verify port availability on your system

- **Note:** This README assumes you have a basic understanding of Docker and Laravel. Adjust the commands and configurations according to your specific project requirements and server environment.