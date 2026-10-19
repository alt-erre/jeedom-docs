#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script autonome (zéro dépendance externe, utilise les identifiants Git de macOS Keychain
via `git credential fill`) pour :
1. Créer le dépôt public `alt-erre/jeedom-docs` sur GitHub s'il n'existe pas encore
2. Synchroniser les 15 labels GitHub définis dans `.github/labels.json`
3. Activer GitHub Pages sur la branche `main` (racine `/`)
"""

import json
import os
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request


def get_github_token() -> str:
    env_tok = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if env_tok:
        return env_tok.strip()
    env = dict(os.environ)
    env["GIT_TERMINAL_PROMPT"] = "0"
    proc = subprocess.run(
        ["git", "credential", "fill"],
        input="protocol=https\nhost=github.com\n\n",
        text=True,
        capture_output=True,
        env=env,
        timeout=5,
        check=True,
    )
    for line in proc.stdout.splitlines():
        if line.startswith("password="):
            return line.split("=", 1)[1].strip()
    raise RuntimeError("Impossible de récupérer le token GitHub via git credential fill.")


def gh_api(method: str, path: str, token: str, payload=None):
    url = f"https://api.github.com{path}"
    data = None
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
            "User-Agent": "alt-erre-jeedom-docs-setup",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            body = resp.read().decode("utf-8")
            return resp.status, (json.loads(body) if body else {})
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        try:
            parsed = json.loads(body)
        except Exception:
            parsed = {"message": body}
        return e.code, parsed


def main() -> None:
    repo_full = sys.argv[1] if len(sys.argv) > 1 else "alt-erre/jeedom-docs"
    owner, repo = repo_full.split("/", 1)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    labels_file = os.path.join(script_dir, "..", ".github", "labels.json")

    token = get_github_token()

    # 1. Vérifier ou créer le dépôt public
    status, info = gh_api("GET", f"/repos/{owner}/{repo}", token)
    if status == 404:
        print(f"Création du dépôt public {owner}/{repo} sur GitHub...")
        st, created = gh_api(
            "POST",
            "/user/repos",
            token,
            {
                "name": repo,
                "description": "Documentation officielle, Changelogs et suivi des Issues des plugins Jeedom alt-erre",
                "private": False,
                "has_issues": True,
                "has_projects": False,
                "has_wiki": False,
            },
        )
        if st not in (200, 201):
            print(f"Erreur création dépôt ({st}) : {created}", file=sys.stderr)
            sys.exit(1)
        print(f" -> Dépôt public créé : https://github.com/{owner}/{repo}")
    else:
        print(f"Dépôt {owner}/{repo} existant (statut {status}).")

    # 2. Synchroniser tous les labels depuis .github/labels.json
    with open(labels_file, "r", encoding="utf-8") as f:
        labels = json.load(f)

    print(f"Synchronisation de {len(labels)} labels sur {owner}/{repo}...")
    for item in labels:
        name = item["name"]
        color = item["color"].lstrip("#")
        desc = item["description"]
        encoded_name = urllib.parse.quote(name, safe="")
        st, _ = gh_api("GET", f"/repos/{owner}/{repo}/labels/{encoded_name}", token)
        if st == 200:
            st_up, res_up = gh_api(
                "PATCH",
                f"/repos/{owner}/{repo}/labels/{encoded_name}",
                token,
                {"new_name": name, "color": color, "description": desc},
            )
            print(f" -> Mis à jour : {name} (#{color}) [{st_up}]")
        else:
            st_cr, res_cr = gh_api(
                "POST",
                f"/repos/{owner}/{repo}/labels",
                token,
                {"name": name, "color": color, "description": desc},
            )
            print(f" -> Créé : {name} (#{color}) [{st_cr}]")

    # 3. Activer GitHub Pages sur la branche main (racine /) si le code est déjà poussé
    st_pg, _ = gh_api("GET", f"/repos/{owner}/{repo}/pages", token)
    if st_pg == 404:
        st_en, res_en = gh_api(
            "POST",
            f"/repos/{owner}/{repo}/pages",
            token,
            {"source": {"branch": "main", "path": "/"}},
        )
        if st_en in (200, 201):
            print(f" -> GitHub Pages activé : https://{owner}.github.io/{repo}/")
        else:
            print(f" -> Info GitHub Pages ({st_en}) : {res_en.get('message', '')}")
    else:
        print(f" -> GitHub Pages déjà actif : https://{owner}.github.io/{repo}/")

    print("Configuration GitHub terminée avec succès !")


if __name__ == "__main__":
    main()
