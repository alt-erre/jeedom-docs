#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# Synchronise les fichiers README.md et CHANGELOG.md des plugins privés alt*
# vers le dépôt public jeedom-docs (<plugin>/index.md et <plugin>/changelog.md)
# et génère le manifeste public versions.json (par identifiant de plugin).
# ------------------------------------------------------------------------------
set -euo pipefail

DOCS_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKSPACE_ROOT="$(cd "$DOCS_ROOT/.." && pwd)"

PLUGINS=(
  "altAirMedia"
  "altArlo"
  "altBambuLab"
  "altCambridgeAudio"
  "altCellular"
  "altDenon"
  "altEducartable"
  "altHue"
  "altIos"
  "altJvcProjector"
  "altNetGuard"
  "altNuki"
  "altPlaystation"
  "altPronote"
  "altRoborock"
  "altSamsungTv"
  "altSiemens"
  "altSonos"
  "altSwitch"
  "altTvDashboard"
  "altTwinkly"
  "altTydom"
  "altXbox"
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

# Génère également le manifeste public versions.json (versions courantes par ID de plugin)
python3 - "$WORKSPACE_ROOT" "$DOCS_ROOT/versions.json" <<'PYEOF'
import json
import os
import sys

workspace_root = sys.argv[1]
out_path = sys.argv[2]
plugins = [
    "altAirMedia", "altArlo", "altBambuLab", "altCambridgeAudio", "altCellular",
    "altDenon", "altEducartable", "altHue", "altIos", "altJvcProjector",
    "altNetGuard", "altNuki", "altPlaystation", "altPronote", "altRoborock",
    "altSamsungTv", "altSiemens", "altSonos", "altSwitch", "altTvDashboard",
    "altTwinkly", "altTydom", "altXbox",
]
versions = {}
for p in plugins:
    ver_file = os.path.join(workspace_root, p, "VERSION")
    info_file = os.path.join(workspace_root, p, "plugin_info", "info.json")
    ver = ""
    if os.path.isfile(info_file):
        try:
            with open(info_file, "r", encoding="utf-8") as f:
                ver = str(json.load(f).get("pluginVersion", "")).strip()
        except Exception:
            pass
    if not ver and os.path.isfile(ver_file):
        with open(ver_file, "r", encoding="utf-8") as f:
            ver = f.read().strip()
    if ver:
        versions[p] = ver

with open(out_path, "w", encoding="utf-8") as f:
    json.dump(versions, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(f"Généré : {out_path} ({len(versions)} plugins)")
PYEOF
