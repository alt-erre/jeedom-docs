#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# Synchronise les fichiers README.md et CHANGELOG.md des 7 plugins privés alt*
# vers le dépôt public jeedom-docs (<plugin>/index.md et <plugin>/changelog.md).
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

# Génère également le manifeste public versions.json (versions courantes + historique des commits)
python3 - "$WORKSPACE_ROOT" "$DOCS_ROOT/versions.json" <<'PYEOF'
import json
import os
import subprocess
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
commits_map = {}

for p in plugins:
    p_dir = os.path.join(workspace_root, p)
    ver_file = os.path.join(p_dir, "VERSION")
    info_file = os.path.join(p_dir, "plugin_info", "info.json")
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

    if os.path.isdir(os.path.join(p_dir, ".git")):
        try:
            revs = subprocess.check_output(
                ["git", "-C", p_dir, "rev-list", "--all"], stderr=subprocess.DEVNULL
            ).decode().splitlines()
            for rev in revs:
                short = rev[:7].lower()
                c_ver = ""
                try:
                    c_ver = subprocess.check_output(
                        ["git", "-C", p_dir, "show", f"{rev}:VERSION"],
                        stderr=subprocess.DEVNULL,
                    ).decode().strip()
                except Exception:
                    try:
                        raw_info = subprocess.check_output(
                            ["git", "-C", p_dir, "show", f"{rev}:plugin_info/info.json"],
                            stderr=subprocess.DEVNULL,
                        ).decode()
                        c_ver = str(json.loads(raw_info).get("pluginVersion", "")).strip()
                    except Exception:
                        pass
                if c_ver:
                    commits_map[short] = c_ver
        except Exception:
            pass

versions["_commits"] = commits_map

with open(out_path, "w", encoding="utf-8") as f:
    json.dump(versions, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(f"Généré : {out_path} ({len(plugins)} plugins, {len(commits_map)} commits indexés)")
PYEOF
