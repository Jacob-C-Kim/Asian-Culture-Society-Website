# Docker Deployment Guide

## Overview

This application is containerized using Docker with security best practices:

- Multi-stage builds for minimal image size
- Non-root user for enhanced security
- Health checks for container monitoring
- Security scanning with Trivy
- Read-only root filesystem

## Quick Start

### Development

```bash
# Using Docker Compose (recommended for development)
docker-compose -f docker-compose.dev.yml up

# Or using Docker directly
docker build -f Dockerfile.dev -t acs-website:dev .
docker run -p 3000:3000 -v $(pwd):/app acs-website:dev
```

### Production

```bash
# Build the production image
docker build -t acs-website:latest .

# Run the container
docker run -d \
  -p 3000:3000 \
  --name acs-website \
  --env-file .env.local \
  --restart unless-stopped \
  acs-website:latest

# Or use Docker Compose
docker-compose up -d
```

## Environment Variables

Create a `.env.local` file from `.env.example`:

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

Required variables for production:

- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NEXT_PUBLIC_APP_URL`: Your application URL

## Health Checks

The application includes a health check endpoint at `/api/health`:

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{
  "status": "healthy",
  "timestamp": "2025-11-06T...",
  "version": "1.0.0"
}
```

## Security Features

### Container Security

- Runs as non-root user (nextjs:nodejs)
- Read-only root filesystem
- Dropped all capabilities except NET_BIND_SERVICE
- No new privileges allowed
- Temporary filesystems for cache directories

### Application Security

- OWASP security headers (CSP, HSTS, X-Frame-Options, etc.)
- Rate limiting on API endpoints
- Input validation and sanitization
- No sensitive data in logs

## Security Scanning

### Scan Docker Image

```bash
# Install Trivy
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

# Scan the image
trivy image acs-website:latest
```

### Scan Dependencies

```bash
npm audit
```

## Production Deployment

### Using Docker Hub

```bash
# Build and tag
docker build -t yourusername/acs-website:latest .

# Push to Docker Hub
docker push yourusername/acs-website:latest

# Pull and run on server
docker pull yourusername/acs-website:latest
docker run -d -p 3000:3000 --env-file .env.local yourusername/acs-website:latest
```

### Using GitHub Container Registry

Images are automatically built and pushed via GitHub Actions:

```bash
docker pull ghcr.io/your-org/acs-website:latest
```

## Troubleshooting

### Check container logs

```bash
docker logs acs-website
```

### Check container health

```bash
docker inspect --format='{{.State.Health.Status}}' acs-website
```

### Access container shell

```bash
docker exec -it acs-website sh
```

### Rebuild without cache

```bash
docker build --no-cache -t acs-website:latest .
```

## Performance Optimization

The production Docker image includes:

- Next.js standalone output (minimal dependencies)
- Multi-stage build (smaller final image)
- Layer caching for faster rebuilds
- Compression enabled

Expected image size: ~150-200MB

## CI/CD Integration

GitHub Actions automatically:

1. Runs security scans (Trivy, npm audit)
2. Builds and tests the Docker image
3. Scans the built image for vulnerabilities
4. Publishes to GitHub Container Registry on release

See `.github/workflows/` for workflow details.
