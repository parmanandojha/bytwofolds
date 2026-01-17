#!/bin/bash

# Script to push TwoFolds code to GitHub
cd /Users/parmanandojha/Desktop/themes/bytwofolds

echo "📦 Checking git status..."
git status

echo ""
echo "🔄 Setting remote to HTTPS..."
git remote set-url origin https://github.com/parmanandojha/twofolds.git

echo ""
echo "📤 Force pushing to GitHub (this will overwrite previous code)..."
echo "⚠️  You will be prompted for GitHub credentials"
echo ""

git push -f origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 View your repository at: https://github.com/parmanandojha/twofolds"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "   1. GitHub credentials (username/password or personal access token)"
    echo "   2. Repository exists at: https://github.com/parmanandojha/twofolds"
    echo "   3. You have write access to the repository"
fi
