# Render Deployment Notes

- Root cause: `/opt/render/.flowise/storage` permission failure during Flowise/Oclif boot.
- Fix: use `pnpm start:render` so `scripts/render-start.sh` prepares writable `HOME`/XDG/storage paths before server start.
- Persistent disk mount path: `/var/data`.
- Fallback without disk: `/tmp/flowise-data` (ephemeral).
- LangSmith warning/latency mitigation: `LANGCHAIN_CALLBACKS_BACKGROUND=true`.
- Docker deploy command override: `/bin/sh -lc "sh ./scripts/render-start.sh"`.
