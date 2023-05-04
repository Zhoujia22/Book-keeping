#!/usr/bin/env
rm -rf dist
npm run build 
cd dist
git init 
git add .
git commit -m deploy
git remote add origin git@github.com:Zhoujia22/Book-keeping-preview.git
git push -f origin main:main
cd -