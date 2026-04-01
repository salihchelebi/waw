#!/usr/bin/env sh
set -eu

MODE="${1:-full}"

log() {
  printf '%s\n' "[render-preflight] $*"
}

run_build() {
  PKG="$1"
  log "BUILD start: ${PKG}"
  pnpm --filter "${PKG}" build
  log "BUILD ok: ${PKG}"
}

log "Node: $(node -v)"
log "pnpm: $(pnpm -v)"

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
