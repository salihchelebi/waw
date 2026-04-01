#!/usr/bin/env sh
set -eu

PERSIST_ROOT="/var/data"
FALLBACK_ROOT="/tmp/flowise-data"

if [ -w "$PERSIST_ROOT" ] || mkdir -p "$PERSIST_ROOT" 2>/dev/null; then
  DATA_ROOT="$PERSIST_ROOT"
else
  DATA_ROOT="$FALLBACK_ROOT"
  mkdir -p "$DATA_ROOT"
fi

export HOME="${HOME:-$DATA_ROOT/home}"
export XDG_CONFIG_HOME="${XDG_CONFIG_HOME:-$DATA_ROOT/.config}"
export XDG_DATA_HOME="${XDG_DATA_HOME:-$DATA_ROOT/.local/share}"
export XDG_CACHE_HOME="${XDG_CACHE_HOME:-$DATA_ROOT/.cache}"

# Flowise app-level storage path
export FLOWISE_FILE_STORAGE_PATH="${FLOWISE_FILE_STORAGE_PATH:-$DATA_ROOT/.flowise}"

# Render / Flowise boot sırasında kullanılacak klasörleri hazırla
mkdir -p "$HOME" \
         "$XDG_CONFIG_HOME" \
         "$XDG_DATA_HOME" \
         "$XDG_CACHE_HOME" \
         "$FLOWISE_FILE_STORAGE_PATH" \
         "$FLOWISE_FILE_STORAGE_PATH/storage"

# LangSmith warning'i latency açısından düzelt, fatal değil
export LANGCHAIN_CALLBACKS_BACKGROUND="${LANGCHAIN_CALLBACKS_BACKGROUND:-true}"

# Render port env varsa koru, yoksa fallback bırak
export PORT="${PORT:-3000}"

# Mevcut repo start zincirini kullan
exec pnpm start:default
