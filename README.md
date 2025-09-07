# WebOnly Deployment Repository

This repository contains the deployment configuration for the WebOnly application.

## Services

- **API**: .NET 8 Web API with SQL Server
- **Frontend**: React with Vite
- **Database**: PostgreSQL (Railway managed)

## Deployment

This repository is configured for Railway deployment.

### API Service
- Dockerfile: `api/Dockerfile`
- Port: 5000
- Health check: `/api/health`

### Frontend Service  
- Dockerfile: `frontend/Dockerfile`
- Port: 3000
- Served by Nginx

## Environment Variables

### API
- `ASPNETCORE_ENVIRONMENT=Production`
- `ConnectionStrings__DefaultConnection=<railway-postgres-url>`

### Frontend
- `VITE_API_URL=https://your-api.railway.app`
