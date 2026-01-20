#!/bin/bash
set -e

echo "🔨 Building SvelteKit app..."
npm run build

echo "🧹 Cleaning docs/ folder..."
rm -rf docs/*

echo "📋 Copying client assets..."
cp -r .svelte-kit/output/client/* docs/

echo "✅ Build deployed to docs/"
echo ""
echo "📊 Verifying files..."
ls -lh docs/index.html
ls -lh docs/_app/immutable/assets/*.css | head -3

echo ""
echo "🚀 Pushing to GitHub..."
git add -A
git commit -m "deploy: Fresh build $(date +%s)" || echo "No changes to commit"
git push origin main

echo "✨ Deployment complete!"
