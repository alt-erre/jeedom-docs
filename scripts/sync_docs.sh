#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# Synchronise les fichiers README.md et CHANGELOG.md des 5 plugins privés alt*
# vers le dépôt public jeedom-docs (<plugin>/index.md et <plugin>/changelog.md).
# ------------------------------------------------------------------------------
set -euo pipefail

DOCS_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKSPACE_ROOT="$(cd "$DOCS_ROOT/.." && pwd)"

PLUGINS=(
  "altAirMedia"
  "altCambridgeAudio"
  "altJvcProjector"
  "altSamsungTv"
  "altSiemens"
)

for plugin in "${PLUGINS[@]}"; do
  src_dir="$WORKSPACE_ROOT/$plugin"
  dst_dir="$DOCS_ROOT/$plugin"
  mkdir -p "$dst_dir"

  if [ -f "$src_dir/README.md" ]; then
    cp "$src_dir/README.md" "$dst_dir/index.md"
  fi
  if [ -f "$src_dir/CHANGELOG.md" ]; then
    cp "$src_dir/CHANGELOG.md" "$dst_dir/changelog.md"
  fi
  echo "Synchronisé : $plugin -> jeedom-docs/$plugin/{index.md,changelog.md}"
done
