#!/usr/bin/env sh
set -eu

MODE="${1:-full}"
FIRST_N="${RENDER_PREFLIGHT_FIRST_N:-260}"
LAST_N="${RENDER_PREFLIGHT_LAST_N:-80}"

if [ "${RENDER_PREFLIGHT_DEBUG:-0}" = "1" ]; then
  set -x
fi

corepack prepare pnpm@10.26.0 --activate >/dev/null 2>&1 || true

log() {
  printf '%s\n' "[render-preflight] $*"
}

summarize_errors() {
  LOG_FILE="$1"
  log "---- error summary (top 120 matched lines) ----"
  grep -E "error|TS[0-9]{4}|Cannot find module|ERR_PNPM_" "${LOG_FILE}" | head -n 120 || true
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
  log "---- first ${FIRST_N} lines ----"
  sed -n "1,${FIRST_N}p" "${TMP_LOG}"
  log "---- last ${LAST_N} lines ----"
  tail -n "${LAST_N}" "${TMP_LOG}"
  summarize_errors "${TMP_LOG}"

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
