Read this and mirror exactly in Replit.

What this repo needs (from its own README)
	•	Next.js 15 + TS + Tailwind + shadcn/ui; i18n via next-intl. Auth with jose (JWT). DB: SQLite via better-sqlite3. Required env: ADMIN_PASSWORD, JWT_SECRET. README references http://localhost:5000.  ￼

What typically breaks on Replit for this repo
	1.	Native module compile: better-sqlite3 needs build tools and sqlite dev headers. Without them you’ll see prebuild-install/g++/make/sqlite errors. (DB driver is explicitly better-sqlite3.)  ￼
	2.	Missing env: ADMIN_PASSWORD, JWT_SECRET not set → login/admin fails.  ￼
	3.	Wrong port binding: README points to :5000. Replit requires $PORT.  ￼
	4.	File/dir expectations: SQLite file path or upload dirs must exist and be writable if the code writes to disk.
	5.	Lockfile drift: Repo has package-lock.json. Regenerating it on Replit can introduce version mismatch. Keep it frozen.  ￼

Fix recipe (drop into Replit Shell)

1) Provide toolchain (Nix) for native builds
Create replit.nix:

{ pkgs }:
let node = pkgs.nodejs_20; in {
  deps = [
    node
    pkgs.python3
    pkgs.gnumake
    pkgs.gcc
    pkgs.pkg-config
    pkgs.sqlite
    pkgs.openssl
  ];
}

Create .replit:

run = "npm run start"
[nix]
channel = "stable-24_05"

2) Install exactly per lockfile

npm ci
npm rebuild better-sqlite3

3) Force Next to bind Replit’s port
Edit package.json scripts to this shape:

{
  "scripts": {
    "dev": "next dev -p $PORT",
    "build": "next build",
    "start": "next start -p $PORT"
  }
}

4) Set required secrets (Replit → Secrets)

ADMIN_PASSWORD=********
JWT_SECRET=********

(These two are explicitly required by the README.)  ￼

5) Prepare runtime dirs

mkdir -p data public/uploads tmp

(Adjust if the code expects a specific sqlite path or upload folder.)

6) Build then run

npm run build
npm run start

Quick error decoder → action
	•	prebuild-install warn install No prebuilt binaries found for better-sqlite3 → Nix deps missing. Use the replit.nix above, then npm rebuild better-sqlite3.
	•	g++: command not found / make: not found → add pkgs.gcc and pkgs.gnumake (already in the Nix file).
	•	sqlite3.h: No such file or directory → add pkgs.sqlite (in the Nix file).
	•	App boots but Replit shows “Listening on 3000/5000” and no web → you didn’t bind $PORT. Fix scripts.
	•	Login/admin rejects or 500 → set ADMIN_PASSWORD, JWT_SECRET secrets.  ￼
	•	Fresh deploy shows empty/locked DB → ensure the sqlite file path is writeable inside the repl; if you migrated from an older repl that stored data locally, you must carry over the DB file or re-seed safely.

Non-negotiables for parity
	•	Use npm ci (lockfile present).  ￼
	•	Do not pin a different Node without need; Node 20 via Nix is safe for Next 15 + native modules.
	•	Bind $PORT for both dev and start.
	•	Secrets present before start.

Minimal ticket text for the Replit agent

Provision Nix with nodejs_20, python3, gcc, gnumake, pkg-config, sqlite, openssl. Run npm ci, then npm rebuild better-sqlite3. Ensure package.json uses next dev -p $PORT and next start -p $PORT. Add Secrets ADMIN_PASSWORD, JWT_SECRET. Create data and public/uploads if needed. Build with npm run build, start with npm run start. Do not regenerate the lockfile. If better-sqlite3 still fails, confirm Nix shell is active and rerun rebuild. The README confirms Next 15, next-intl, jose JWT, better-sqlite3, and required env; localhost:5000 must be replaced by $PORT.  ￼