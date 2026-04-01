#!/usr/bin/env sh
set -eu

if [ "${RENDER_PREFLIGHT_DEBUG:-0}" = "1" ]; then
  set -x
fi

MODE="${1:-full}"

log() { printf '%s\n' "[render-preflight] $*"; }
die() { log "$*"; exit 1; }

log "MODE: ${MODE}"
log "PWD: $(pwd)"
log "Node: $(node -v 2>/dev/null || echo 'node-missing')"
log "pnpm: $(pnpm -v 2>/dev/null || echo 'pnpm-missing')"

# Render Docker base: node:20-*
NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]" 2>/dev/null || echo '')"
if [ "${RENDER_PREFLIGHT_ALLOW_NODE_MISMATCH:-0}" != "1" ] && [ "${NODE_MAJOR}" != "20" ]; then
  die "CLASS=ENGINE/TOOLCHAIN expected Node 20, got $(node -v)"
fi

summarize_log() {
  FILE="$1"
  log "---- error summary (top matches) ----"
  grep -nE "TS[0-9]{4}|Cannot find module|ERR_PNPM_|error:|Error:" "$FILE" | head -n 40 || true
}

run_build() {
  PKG="$1"
  log "BUILD start: ${PKG}"
  TMP_LOG="$(mktemp)"

  if pnpm --filter "${PKG}" build >"$TMP_LOG" 2>&1; then
    cat "$TMP_LOG"
    rm -f "$TMP_LOG"
    log "BUILD ok: ${PKG}"
    return 0
  fi

  log "BUILD fail: ${PKG}"
  summarize_log "$TMP_LOG"
  log "---- first 220 lines ----"
  sed -n '1,220p' "$TMP_LOG"
  log "---- last 120 lines ----"
  tail -n 120 "$TMP_LOG"

  if grep -q "TS[0-9][0-9][0-9][0-9]" "$TMP_LOG"; then
    log "CLASS=BUILD/COMPILE (TypeScript)"
  elif grep -q "Cannot find module" "$TMP_LOG"; then
    log "CLASS=MODULE/IMPORT/EXPORT"
  elif grep -q "ERR_PNPM_" "$TMP_LOG"; then
    log "CLASS=DEP/LOCKFILE/REGISTRY"
  else
    log "CLASS=UNKNOWN"
  fi

  rm -f "$TMP_LOG"
  return 1
}

if [ "${MODE}" = "--build-only" ]; then
  run_build "./packages/components"
  run_build "./packages/ui"
  run_build "./packages/server"
  exit 0
fi

log "INSTALL frozen-lockfile start"
pnpm install --frozen-lockfile --prefer-offline
log "INSTALL frozen-lockfile ok"

run_build "./packages/components"
run_build "./packages/ui"
run_build "./packages/server"
