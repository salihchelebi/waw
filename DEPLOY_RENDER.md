# Render Deploy (Docker) — waw

## Render ayarlari
- Service: Web Service
- Runtime: Docker
- Repo: salihchelebi/waw (branch: main)
- Docker Build Context: .
- Dockerfile Path: ./Dockerfile
- Health Check Path: /api/v1/ping

## Kalici disk (kritik)
- Add Persistent Disk
- Mount Path: /opt/render/.flowise

## Minimum ENV (Render Dashboard)
- HOST=0.0.0.0
- PORT=3000
- DATABASE_PATH=/opt/render/.flowise
- SECRETKEY_PATH=/opt/render/.flowise
- APIKEY_PATH=/opt/render/.flowise
- LOG_PATH=/opt/render/.flowise/logs
- BLOB_STORAGE_PATH=/opt/render/.flowise/storage

## Referans
- packages/server/.env.example
- packages/ui/.env.example