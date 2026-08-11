# Environment Check — Phase 1

**Date:** 2026-08-11
**OS:** Pop!_OS 24.04 LTS (x86_64)

## Detected Tools

| Tool         | Required                    | Detected      | Status   |
| ------------ | --------------------------- | ------------- | -------- |
| Node.js      | 20+                         | v26.7.0       | OK       |
| npm          | bundled with Node           | 11.19.0       | OK       |
| Git          | any recent                  | 2.43.0        | OK       |
| Wrangler CLI | latest                      | Not installed | MISSING  |
| FFmpeg       | any recent (required later) | Not installed | OPTIONAL |
| curl         | any recent                  | 8.5.0         | OK       |

## Missing Tools — Installation Instructions (Pop!_OS 24.04)

### 1. Node.js 20+ (REQUIRED — BLOCKER)

Recommended: install via `nvm` for version management.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
nvm alias default 20
```

Verify:

```bash
node --version   # should show v20.x.x or higher
npm --version    # should show 10.x.x or higher
```

### 2. Cloudflare Wrangler CLI (REQUIRED for Phase 1 Cloudflare tasks)

```bash
npm install -g wrangler
wrangler --version
```

### 3. FFmpeg (OPTIONAL for Phase 1, REQUIRED in later phases)

```bash
sudo apt update
sudo apt install ffmpeg
ffmpeg -version
```

## Recommendation

**PROCEED — Phase 1 can continue.**

Node.js 20+ is installed and verified. Required tools are available.

Remaining optional installations:

- Wrangler CLI (needed for Cloudflare tasks in Task 1.10-1.11)
- FFmpeg (optional for Phase 1, required in later phases)
