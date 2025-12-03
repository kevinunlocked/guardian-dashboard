#!/bin/bash

echo "🔄 Switching to main..."
git checkout main

echo "⬇️ Pulling latest changes..."
git pull origin main

echo "➕ Adding all changes..."
git add .

echo "📝 Committing..."
git commit -m "Deploy update" || echo "No changes to commit"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "🎉 Deployment complete!"
