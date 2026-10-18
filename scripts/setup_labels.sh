#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# Crée ou met à jour automatiquement tous les labels GitHub (plugins, canaux,
# types et statuts) sur le dépôt public alt-erre/jeedom-docs via GitHub CLI (gh).
# ------------------------------------------------------------------------------
set -euo pipefail

REPO="${1:-alt-erre/jeedom-docs}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LABELS_FILE="$SCRIPT_DIR/../.github/labels.json"

if ! command -v gh >/dev/null 2>&1; then
  echo "Erreur : GitHub CLI ('gh') n'est pas installé." >&2
  exit 1
fi

echo "Synchronisation des labels sur le dépôt $REPO..."

python3 - "$LABELS_FILE" "$REPO" <<'PY'
import json
import subprocess
import sys

labels_file, repo = sys.argv[1], sys.argv[2]
with open(labels_file, "r", encoding="utf-8") as f:
    labels = json.load(f)

for item in labels:
    name = item["name"]
    color = item["color"]
    desc = item["description"]
    print(f" -> Label '{name}' (#{color})...")
    subprocess.run(
        [
            "gh", "label", "create", name,
            "--repo", repo,
            "--color", color,
            "--description", desc,
            "--force",
        ],
        check=True,
    )
print("Tous les labels ont été configurés avec succès !")
PY
