# Deployment notes

This repo includes a GitHub Actions workflow that deploys Convex functions to your Convex project on pushes to main.

Important steps to finish deployment:

1. Push this repo to GitHub
   - If your local repo is not yet a git repo:
     git init
     git add .
     git commit -m "Initial commit"
   - If you already have commits, just add the new files and commit:
     git add .github/workflows/deploy-convex.yml .gitignore README_DEPLOY.md
     git commit -m "Add Convex deploy workflow and gitignore"

2. Add the remote and push (replace OWNER with your GitHub username if different)
   git remote add origin git@github.com:bakurkvaratskhelia/reddit.git
   git branch -M main
   git push -u origin main

   If GitHub already created a default README and the push is rejected, run:
   git pull --rebase origin main
   # resolve any merge issues, then:
   git push origin main

3. Add CONVEX_TOKEN to GitHub Secrets
   - Go to your repo on GitHub → Settings → Secrets and variables → Actions → New repository secret
   - Name: CONVEX_TOKEN
   - Value: (paste your Convex deploy token)
   - Save

4. Verify the Action
   - After pushing to main, go to the repo → Actions → "Deploy Convex Functions" and watch the run logs.
   - If it fails, open the logs and copy the error here — I’ll help debug.

5. (Optional) Frontend hosting
   - I recommend using Vercel for the front-end.
   - Connect your repo in Vercel, set build command `npm run build`, output dir `dist`.
   - Set any public client variables in Vercel as VITE_ prefixed env vars (e.g. VITE_CLERK_PUBLISHABLE_KEY).

Notes
- The workflow uses `npx convex deploy`. If you prefer to install convex in devDependencies, run `npm i -D convex` and the action will be faster.
- Ensure your Convex token has deploy permissions. If unsure, create a new deploy token from the Convex dashboard.