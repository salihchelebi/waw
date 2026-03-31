# Render Deploy (Docker) — waw

## Health
- `/api/v1/ping` -> `pong`

## Persistent Disk
Mount disk to:
- `/opt/render/.flowise`

## Minimum ENV
- `HOST=0.0.0.0`
- `PORT=3000`
- `DATABASE_PATH=/opt/render/.flowise`
- `SECRETKEY_PATH=/opt/render/.flowise`
- `APIKEY_PATH=/opt/render/.flowise`
- `LOG_PATH=/opt/render/.flowise/logs`
- `BLOB_STORAGE_PATH=/opt/render/.flowise/storage`

## Start
Docker CMD:
- `node scripts/render-start.js`