#!/usr/bin/env bash
set -u -o pipefail

HB="${HB:-0.1}"
MAX_RETRY="${MAX_RETRY:-2}"
TIMEOUT_INSTALL="${TIMEOUT_INSTALL:-1200}"

NODE_WANTED="${NODE_WANTED:-20.19.2}"   # repo .nvmrc ile uyumlu
PNPM_WANTED="${PNPM_WANTED:-10.26.0}"   # repo engines ile uyumlu

LOG_DIR="${LOG_DIR:-$PWD/.codex-logs}"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/orch-fast-$(date +%Y%m%d-%H%M%S).log"

DONE=0
ERR=0
FALLBACK="NONE"
ACTIVE="BOOT"
DONE_TASK=0

pct(){ printf "%3d" "$DONE"; }
tick(){ echo "[ $(pct)%% ] AKTIF=$ACTIVE | TAMAM=$DONE_TASK | HATA=$ERR | FALLBACK=$FALLBACK"; }

ok(){ DONE_TASK=$((DONE_TASK+1)); echo "BASARILI: $1"; }
bad(){ ERR=$((ERR+1)); echo "BASARISIZ: $1"; }

bump(){ DONE=$((DONE+$1)); [ "$DONE" -gt 99 ] && DONE=99; }

run_with_timeout(){
  local cmd="$1"
  if command -v timeout >/dev/null 2>&1; then
    bash -lc "timeout ${TIMEOUT_INSTALL}s $cmd"
  else
    bash -lc "$cmd"
  fi
}

run_live(){
  local label="$1"; shift
  local cmd="$*"
  ACTIVE="$label"

  echo "" | tee -a "$LOG_FILE"
  echo "===== $label =====" | tee -a "$LOG_FILE"
  echo "CMD: $cmd" | tee -a "$LOG_FILE"

  ( run_with_timeout "$cmd" ) 2>&1 | tee -a "$LOG_FILE" &
  local pid=$!

  while kill -0 "$pid" 2>/dev/null; do
    tick
    sleep "$HB"
  done

  wait "$pid"; local rc=$?
  if [ $rc -eq 0 ]; then
    ok "$label"
    return 0
  else
    bad "$label (rc=$rc)"
    echo "SON 30 SATIR (DELIL):"
    tail -n 30 "$LOG_FILE" || true
    return 1
  fi
}

retry(){
  local label="$1"; shift
  local cmd="$*"
  local i=0
  while [ $i -le "$MAX_RETRY" ]; do
    if [ $i -gt 0 ]; then
      FALLBACK="RETRY_$i"
      echo "IF/ELSE/THEN: $label -> RETRY $i"
    fi
    if run_live "$label" "$cmd"; then
      FALLBACK="NONE"
      return 0
    fi
    i=$((i+1))
  done
  return 1
}

echo "START (VISIBLE 0.1s HEARTBEAT) | LOG=$LOG_FILE"
bump 1; tick

# --- 0) NODE/Pnpm PIN (BU SENDEKİ ASIL BLOKAJ) ---
# Node 22 + pnpm 10.13.1 -> engines yüzünden pnpm install patlıyor. :contentReference[oaicite:3]{index=3}
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck disable=SC1090
  . "$HOME/.nvm/nvm.sh" >>"$LOG_FILE" 2>&1 || true
  retry "PIN_NODE_${NODE_WANTED}" "nvm install ${NODE_WANTED} && nvm use ${NODE_WANTED} && node -v && which node" || true
else
  echo "BASARISIZ: NVM YOK -> NODE PINLEYEMEM"
  ERR=$((ERR+1))
fi

retry "PIN_PNPM_${PNPM_WANTED}" "corepack enable && corepack prepare pnpm@${PNPM_WANTED} --activate && pnpm -v && which pnpm" || true
bump 10

# 1) FAST PATH: Render'daki patlayan komut
if retry "FAST_FROZEN_INSTALL" "pnpm install --frozen-lockfile --prefer-offline"; then
  bump 60
else
  bump 10

  # 2) IF/ELSE: lockfile mismatch ise A/B/C
  if grep -qE "OUTDATED_LOCKFILE|specifiers in the lockfile don't match|ERR_PNPM_OUTDATED_LOCKFILE" "$LOG_FILE"; then
    echo "IF: LOCKFILE MISMATCH -> THEN FIX A/B/C"

    FALLBACK="FIX_A"
    retry "FIX_A_WORKSPACE" "pnpm -w install --no-frozen-lockfile --prefer-offline" || true
    FALLBACK="NONE"
    retry "RETRY_FROZEN_AFTER_A" "pnpm install --frozen-lockfile --prefer-offline" && bump 20

    FALLBACK="FIX_B"
    retry "FIX_B_COMPONENTS" "pnpm --filter ./packages/components install --no-frozen-lockfile --prefer-offline" || true
    FALLBACK="NONE"
    retry "RETRY_FROZEN_AFTER_B" "pnpm install --frozen-lockfile --prefer-offline" && bump 10

    FALLBACK="FIX_C"
    retry "FIX_C_HARD_RESET" "rm -rf node_modules packages/*/node_modules pnpm-lock.yaml && pnpm -w install --no-frozen-lockfile --prefer-offline" || true
    FALLBACK="NONE"
    retry "RETRY_FROZEN_AFTER_C" "pnpm install --frozen-lockfile --prefer-offline" && bump 10
  else
    echo "ELSE: LOCKFILE MISMATCH DEGIL -> RAPORLA"
    ERR=$((ERR+1))
  fi
fi

DONE=100; tick
echo ""
echo "LOG_FILE=$LOG_FILE"
echo "DONE_TASK=$DONE_TASK | ERR=$ERR | FALLBACK=$FALLBACK"

if [ "$ERR" -eq 0 ]; then
  echo "=========== BASARILI ==========="
  exit 0
else
  echo "=========== BASARISIZ ($ERR) ==========="
  exit 1
fi
