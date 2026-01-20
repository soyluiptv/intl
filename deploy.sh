#!/bin/bash
set -e

echo "🔨 Building SvelteKit app..."
npm run build

echo "🧹 Cleaning docs/ folder..."
rm -rf docs/*

echo "📋 Copying client assets..."
cp -r .svelte-kit/output/client/* docs/

echo "📄 Copying static files (M3U playlists)..."
cp -r static/* docs/ 2>/dev/null || true

echo "🔧 Fixing CSS and asset paths for GitHub Pages..."
sed -i 's|href="\./|href="/intl/|g' docs/index.html
sed -i 's|src="\./|src="/intl/|g' docs/index.html
sed -i 's|href="/intl/_app|href="/intl/_app|g' docs/index.html

echo "✅ Build deployed to docs/"
echo ""
echo "📊 Verifying files..."
ls -lh docs/index.html
ls -lh docs/_app/immutable/assets/*.css | head -3
ls -lh docs/*.m3u 2>/dev/null | head -3 || echo "   (no m3u files)"

echo ""
echo "🚀 Pushing to GitHub..."
git add -A
git commit -m "deploy: Fresh build with assets and playlists ($(date +%s))" || echo "No changes to commit"
git push origin main

echo "✨ Deployment complete!"
