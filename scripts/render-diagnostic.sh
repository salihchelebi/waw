#!/usr/bin/env sh
set -eu

SERVICE_ID="srv-d75ce8ea2pns73dm2h60"
LIVE_APP="https://wixo.onrender.com"
HEALTH_URL="https://wixo.onrender.com/api/v1/ping"
LOGS_URL="https://dashboard.render.com/web/srv-d75ce8ea2pns73dm2h60/logs"
DEPLOYS_URL="https://dashboard.render.com/web/srv-d75ce8ea2pns73dm2h60/deploys"

probe() {
  NAME="$1"
  URL="$2"
  BODY_FILE="$(mktemp)"
  printf '\n[render-diagnostic] %s -> %s\n' "$NAME" "$URL"
  HTTP_CODE="$(curl -sS -o "${BODY_FILE}" -w "%{http_code}" "$URL" || true)"
  printf '[render-diagnostic] service=%s status=%s\n' "$SERVICE_ID" "$HTTP_CODE"
  sed -n '1,20p' "${BODY_FILE}" || true
  rm -f "${BODY_FILE}"
}

probe "health" "$HEALTH_URL"
probe "live" "$LIVE_APP"
probe "logs" "$LOGS_URL"
probe "deploys" "$DEPLOYS_URL"
