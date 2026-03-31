#!/usr/bin/env sh
set -eu

if [ -w /var/data ]; then
  export FLOWISE_FILE_STORAGE_PATH="${FLOWISE_FILE_STORAGE_PATH:-/var/data/.flowise}"
else
  export FLOWISE_FILE_STORAGE_PATH="${FLOWISE_FILE_STORAGE_PATH:-/tmp/.flowise}"
fi

mkdir -p "$FLOWISE_FILE_STORAGE_PATH"

exec pnpm start
