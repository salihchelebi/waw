#!/usr/bin/env sh
set -eu

MODE="${1:-full}"

corepack prepare pnpm@10.26.0 --activate >/dev/null 2>&1 || true

log() {
  printf '%s\n' "[render-preflight] $*"
}

run_build() {
  PKG="$1"
  log "BUILD start: ${PKG}"
  TMP_LOG="$(mktemp)"
  if pnpm --filter "${PKG}" build >"${TMP_LOG}" 2>&1; then
    cat "${TMP_LOG}"
    rm -f "${TMP_LOG}"
    log "BUILD ok: ${PKG}"
    return 0
  fi

  log "BUILD fail: ${PKG}"
  log "---- first 160 lines ----"
  sed -n '1,160p' "${TMP_LOG}"
  log "---- last 40 lines ----"
  tail -n 40 "${TMP_LOG}"

  if grep -q "TS[0-9][0-9][0-9][0-9]" "${TMP_LOG}"; then
    log "CLASS=BUILD/COMPILE (TypeScript)"
  elif grep -q "Cannot find module" "${TMP_LOG}"; then
    log "CLASS=MODULE/IMPORT/EXPORT"
  elif grep -q "ERR_PNPM_" "${TMP_LOG}"; then
    log "CLASS=DEP/LOCKFILE/REGISTRY"
  else
    log "CLASS=UNKNOWN"
  fi

  rm -f "${TMP_LOG}"
  return 1
}

log "Node: $(node -v)"
log "pnpm: $(pnpm -v)"

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "${NODE_MAJOR}" != "20" ]; then
  log "CLASS=ENGINE/TOOLCHAIN (expected Node 20, got $(node -v))"
  exit 1
fi

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
