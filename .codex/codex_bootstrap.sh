#!/usr/bin/env bash
set -euo pipefail

mkdir -p .codex

python3 - <<'PY'
from pathlib import Path

files = {}

files[".codex/pin-node-pnpm.sh"] = r'''#!/usr/bin/env bash
set -u -o pipefail

NODE_WANTED="${NODE_WANTED:-20.19.2}"
PNPM_WANTED="${PNPM_WANTED:-10.26.0}"

echo "[PIN] TARGET NODE=$NODE_WANTED PNPM=$PNPM_WANTED"

if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck disable=SC1090
  . "$HOME/.nvm/nvm.sh" >/dev/null 2>&1 || true
  nvm install "$NODE_WANTED"
  nvm use "$NODE_WANTED"
else
  echo "[WARN] NVM YOK, MEVCUT NODE KULLANILACAK"
fi

corepack enable
corepack prepare "pnpm@${PNPM_WANTED}" --activate

echo "[EVIDENCE] node=$(node -v 2>/dev/null || true) path=$(command -v node || true)"
echo "[EVIDENCE] pnpm=$(pnpm -v 2>/dev/null || true) path=$(command -v pnpm || true)"
'''

files[".codex/orchestrator-fast.sh"] = r'''#!/usr/bin/env bash
set -u -o pipefail

HB="${HB:-0.1}"
MAX_RETRY="${MAX_RETRY:-2}"
TIMEOUT_INSTALL="${TIMEOUT_INSTALL:-1200}"

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
  if [ "$rc" -eq 0 ]; then
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
  while [ "$i" -le "$MAX_RETRY" ]; do
    if [ "$i" -gt 0 ]; then
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

echo "START (VISIBLE ${HB}s HEARTBEAT) | LOG=$LOG_FILE"
echo "EVIDENCE: node=$(node -v 2>/dev/null || true) | $(command -v node || true)" | tee -a "$LOG_FILE"
echo "EVIDENCE: pnpm=$(pnpm -v 2>/dev/null || true) | $(command -v pnpm || true)" | tee -a "$LOG_FILE"

bump 1; tick

if retry "FAST_FROZEN_INSTALL" "pnpm install --frozen-lockfile --prefer-offline"; then
  bump 60
else
  bump 10

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
'''

files[".codex/orchestrator.sh"] = r'''#!/usr/bin/env bash
set -u -o pipefail
exec bash .codex/orchestrator-fast.sh
'''

files[".codex/runner-fast.sh"] = r'''#!/usr/bin/env bash
set -u -o pipefail
exec bash .codex/orchestrator-fast.sh
'''

files[".codex/runner.sh"] = r'''#!/usr/bin/env bash
set -u -o pipefail
exec bash .codex/orchestrator-fast.sh
'''

files[".codex/preflight-render.sh"] = r'''#!/usr/bin/env bash
set -u -o pipefail

echo "[PREFLIGHT] ROOT=$(pwd)"
echo "[PREFLIGHT] node=$(node -v 2>/dev/null || true)"
echo "[PREFLIGHT] pnpm=$(pnpm -v 2>/dev/null || true)"

if [ -f package.json ]; then
  echo "[PREFLIGHT] package.json VAR"
else
  echo "[PREFLIGHT] package.json YOK"
  exit 1
fi

if [ -f pnpm-lock.yaml ]; then
  echo "[PREFLIGHT] pnpm-lock.yaml VAR"
else
  echo "[PREFLIGHT] pnpm-lock.yaml YOK"
fi

exit 0
'''

files[".codex/entry.sh"] = r'''#!/usr/bin/env bash
set -u -o pipefail

HB="${HB:-0.1}"

LOG_DIR="${LOG_DIR:-$PWD/.codex-logs}"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/entry-$(date +%Y%m%d-%H%M%S).log"

DONE=0
ERR=0
ACTIVE="BOOT"
FALLBACK="NONE"
OK_SCRIPT=""

pct(){ printf "%3d" "$DONE"; }
tick(){ echo "[ $(pct)%% ] AKTIF=$ACTIVE | HATA=$ERR | FALLBACK=$FALLBACK | LOG=$LOG_FILE"; }
bump(){ DONE=$((DONE+$1)); [ "$DONE" -gt 99 ] && DONE=99; }
say(){ echo "$*" | tee -a "$LOG_FILE"; }
OK(){ say "BASARILI: $*"; }
BAD(){ ERR=$((ERR+1)); say "BASARISIZ: $*"; }

run_bg_with_heartbeat(){
  local label="$1"; shift
  local cmd="$*"
  ACTIVE="$label"

  say ""
  say "===== RUN: $label ====="
  say "CMD: $cmd"

  bash -lc "$cmd" 2>&1 | tee -a "$LOG_FILE" &
  local pid=$!

  while kill -0 "$pid" 2>/dev/null; do
    tick
    sleep "$HB"
  done

  wait "$pid"; local rc=$?
  if [ "$rc" -eq 0 ]; then
    OK "$label"
    return 0
  else
    BAD "$label (rc=$rc)"
    say "SON 25 SATIR (DELIL):"
    tail -n 25 "$LOG_FILE" || true
    return 1
  fi
}

pin_node_pnpm(){
  bump 2; tick
  if run_bg_with_heartbeat "PIN_NODE_PNPM" "bash .codex/pin-node-pnpm.sh"; then
    return 0
  fi
  return 1
}

try_script(){
  local path="$1"
  if [ -f "$path" ]; then
    chmod +x "$path" 2>/dev/null || true
    FALLBACK="$path"
    bump 3; tick
    if run_bg_with_heartbeat "RUN_$path" "bash $path"; then
      OK_SCRIPT="$path"
      return 0
    fi
    return 1
  else
    say "SKIP: $path (YOK)"
    return 2
  fi
}

main(){
  say "START | HB=${HB}s | LOG=$LOG_FILE"
  bump 1; tick

  pin_node_pnpm || true
  bump 5; tick

  local scripts=(
    ".codex/orchestrator-fast.sh"
    ".codex/orchestrator.sh"
    ".codex/runner-fast.sh"
    ".codex/runner.sh"
    ".codex/preflight-render.sh"
  )

  local any_ok=1
  for s in "${scripts[@]}"; do
    if try_script "$s"; then
      any_ok=0
      break
    fi
  done

  DONE=100; tick
  say ""
  say "OK_SCRIPT=$OK_SCRIPT"
  say "ERR=$ERR"
  say "LOG_FILE=$LOG_FILE"

  if [ "$any_ok" -eq 0 ]; then
    say "=========== BASARILI ==========="
    exit 0
  else
    say "=========== BASARISIZ ==========="
    exit 1
  fi
}

main
'''

files[".gitignore.codex.append"] = r'''!.codex/
!.codex/**
'''

for rel, content in files.items():
    path = Path(rel)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    if rel.endswith(".sh"):
        path.chmod(0o755)
PY

if [ -f .gitignore ]; then
  if ! grep -qxF '!.codex/' .gitignore; then printf '\n!.codex/\n' >> .gitignore; fi
  if ! grep -qxF '!.codex/**' .gitignore; then printf '!.codex/**\n' >> .gitignore; fi
else
  printf '!.codex/\n!.codex/**\n' > .gitignore
fi

git add .codex .gitignore
git commit -m "add persistent codex orchestration scripts" || true
git push

bash .codex/entry.sh
