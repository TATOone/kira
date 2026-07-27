#!/usr/bin/env bash
# Re-apply Keystatic Cloudflare env fix after npm install
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/src/lib/keystatic-astro-api-fix.js"
DST="$ROOT/node_modules/@keystatic/astro/dist/keystatic-astro-api.js"
if [[ -f "$SRC" && -f "$DST" ]]; then
  cp "$SRC" "$DST"
  echo "Applied Keystatic Cloudflare env patch"
fi
