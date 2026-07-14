//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let fs = require("fs");
fs = __toESM(fs);
let path = require("path");
path = __toESM(path);
let __clack_prompts = require("@clack/prompts");
__clack_prompts = __toESM(__clack_prompts);
let picocolors = require("picocolors");
picocolors = __toESM(picocolors);
let child_process = require("child_process");
child_process = __toESM(child_process);
let os = require("os");
os = __toESM(os);
let https = require("https");
https = __toESM(https);

//#region src/constants/Product.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
*
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/
const Product = { NAME: "ThunderID" };
var Product_default = Product;

//#endregion
//#region src/deploy/recipes/fly.ts
function getFlyToml({ appName, dbType }) {
	const lines = [
		`app = "${appName}"`,
		`primary_region = "iad"`,
		``,
		`[http_service]`,
		`  internal_port = 8090`,
		`  force_https = true`,
		`  auto_stop_machines = true`,
		`  auto_start_machines = true`,
		`  min_machines_running = 0`
	];
	if (dbType === "sqlite") lines.push(``, `[[mounts]]`, `  source = "thunder_data"`, `  destination = "/data"`);
	return lines.join("\n") + "\n";
}
const fly = {
	id: "fly",
	displayName: "Fly.io",
	description: "Free tier, persistent volumes for SQLite, single command",
	comingSoon: true,
	cliName: "flyctl",
	installCmd: "curl -L https://fly.io/install.sh | sh",
	postInstallPath: path.join(os.homedir(), ".fly", "bin"),
	preflight() {
		if ((0, child_process.spawnSync)("flyctl", ["auth", "whoami"], { stdio: "pipe" }).status !== 0) {
			__clack_prompts.log.info("Not logged in to Fly.io — opening browser to authenticate...");
			(0, child_process.execSync)("flyctl auth login", { stdio: "inherit" });
		}
		return Promise.resolve();
	},
	deploy({ appName = "thunder-app", dbType, dbUrl }) {
		const cwd = process.cwd();
		fs.writeFileSync(path.join(cwd, "fly.toml"), getFlyToml({
			appName,
			dbType
		}), "utf8");
		__clack_prompts.log.success("Generated fly.toml");
		__clack_prompts.log.info(`Creating Fly.io app: ${picocolors.default.cyan(appName)}`);
		(0, child_process.execSync)(`flyctl launch --name "${appName}" --no-deploy --copy-config --yes`, { stdio: "inherit" });
		if (dbType === "sqlite") {
			__clack_prompts.log.info("Creating persistent volume for SQLite...");
			(0, child_process.execSync)(`flyctl volumes create thunder_data --size 1 --yes --app "${appName}"`, { stdio: "inherit" });
		}
		if (dbType === "postgres" && dbUrl) {
			__clack_prompts.log.info("Setting database secret...");
			(0, child_process.execSync)(`flyctl secrets set "DATABASE_URL=${dbUrl}" --app "${appName}"`, { stdio: "inherit" });
		}
		__clack_prompts.log.info("Building and deploying (this takes a few minutes)...");
		(0, child_process.execSync)("flyctl deploy", { stdio: "inherit" });
		__clack_prompts.log.success(`${picocolors.default.bold(picocolors.default.green("Deployed!"))} ${picocolors.default.cyan(`https://${appName}.fly.dev`)}`);
		return Promise.resolve();
	}
};
var fly_default = fly;

//#endregion
//#region src/deploy/recipes/railway.ts
function getRailwayToml() {
	return [
		`[build]`,
		`  builder = "dockerfile"`,
		``,
		`[deploy]`,
		`  healthcheckTimeout = 300`
	].join("\n") + "\n";
}
const railway = {
	id: "railway",
	displayName: "Railway",
	description: "Simple deploys, built-in managed Postgres option",
	cliName: "railway",
	installCmd: "npm install -g @railway/cli",
	needsAppName: false,
	preflight() {
		if ((0, child_process.spawnSync)("railway", ["whoami"], { stdio: "pipe" }).status !== 0) {
			__clack_prompts.log.info("Not logged in to Railway — opening browser to authenticate...");
			(0, child_process.execSync)("railway login", { stdio: "inherit" });
		}
		return Promise.resolve();
	},
	async deploy({ dbType, dbUrl }) {
		let appName;
		const cwd = process.cwd();
		let existingProjects = [];
		try {
			const result = (0, child_process.spawnSync)("railway", ["list", "--json"], {
				stdio: "pipe",
				encoding: "utf8"
			});
			if (result.status === 0) existingProjects = JSON.parse(result.stdout);
		} catch {}
		let linkToProject = null;
		if (existingProjects.length > 0) {
			const choice = await (0, __clack_prompts.select)({
				message: "Railway project:",
				options: [...existingProjects.map((p) => ({
					value: p.id,
					label: p.name
				})), {
					value: "__new__",
					label: "Create new project"
				}]
			});
			if ((0, __clack_prompts.isCancel)(choice)) {
				(0, __clack_prompts.cancel)("Deploy cancelled.");
				process.exit(0);
			}
			if (choice !== "__new__") linkToProject = choice;
		}
		fs.writeFileSync(path.join(cwd, "railway.toml"), getRailwayToml(), "utf8");
		__clack_prompts.log.success("Generated railway.toml");
		if (linkToProject) {
			__clack_prompts.log.info("Linking to existing Railway project...");
			(0, child_process.execSync)(`railway link -p "${linkToProject}"`, { stdio: "inherit" });
		} else {
			const defaultName = `thunder-${Math.random().toString(36).slice(2, 7)}`;
			const appNameInput = await (0, __clack_prompts.text)({
				message: "App name:",
				placeholder: defaultName,
				defaultValue: defaultName
			});
			if ((0, __clack_prompts.isCancel)(appNameInput)) {
				(0, __clack_prompts.cancel)("Deploy cancelled.");
				process.exit(0);
			}
			appName = appNameInput || defaultName;
			__clack_prompts.log.info(`Initializing Railway project: ${picocolors.default.cyan(appName)}`);
			(0, child_process.execSync)(`railway init --name "${appName}"`, { stdio: "inherit" });
		}
		if (dbType === "postgres" && dbUrl) {
			__clack_prompts.log.info("Setting DATABASE_URL...");
			(0, child_process.execSync)(`railway variables set "DATABASE_URL=${dbUrl}"`, { stdio: "inherit" });
		}
		__clack_prompts.log.info("Deploying (this takes a few minutes)...");
		(0, child_process.execSync)("railway up --detach", { stdio: "inherit" });
		const domain = (0, child_process.spawnSync)("railway", ["domain"], {
			stdio: "pipe",
			encoding: "utf8"
		}).stdout?.trim();
		if (domain) __clack_prompts.log.success(`${picocolors.default.bold(picocolors.default.green("Deployed!"))} ${picocolors.default.cyan(`https://${domain}`)}`);
		else __clack_prompts.log.success(`${picocolors.default.bold(picocolors.default.green("Deployed!"))} Run ${picocolors.default.cyan("railway open")} to view your app.`);
	}
};
var railway_default = railway;

//#endregion
//#region src/deploy/recipes/render.ts
function getRenderYaml({ appName, dbType }) {
	const lines = [
		`services:`,
		`  - type: web`,
		`    name: ${appName}`,
		`    env: docker`,
		`    dockerfilePath: ./Dockerfile`,
		`    dockerContext: .`,
		`    healthCheckPath: /health`
	];
	if (dbType === "sqlite") lines.push(`    disk:`, `      name: thunder-data`, `      mountPath: /data`, `      sizeGB: 1`);
	if (dbType === "postgres") lines.push(`    envVars:`, `      - key: DATABASE_URL`, `        sync: false`);
	return lines.join("\n") + "\n";
}
const render = {
	id: "render",
	displayName: "Render",
	description: "Free tier web services — generates files, requires GitHub",
	comingSoon: true,
	preflight() {
		return Promise.resolve();
	},
	deploy({ appName = "thunder-app", dbType }) {
		const cwd = process.cwd();
		fs.writeFileSync(path.join(cwd, "render.yaml"), getRenderYaml({
			appName,
			dbType
		}), "utf8");
		__clack_prompts.log.success("Generated render.yaml");
		const steps = [
			`Files ready: ${picocolors.default.cyan("Dockerfile")} + ${picocolors.default.cyan("render.yaml")}`,
			``,
			`Next steps:`,
			`  1. Commit and push this directory to a GitHub repository`,
			`  2. Go to ${picocolors.default.cyan("https://render.com")} → New → Web Service`,
			`  3. Connect your GitHub repo — Render auto-detects ${picocolors.default.cyan("render.yaml")}`
		];
		if (dbType === "postgres") steps.push(`  4. Set ${picocolors.default.cyan("DATABASE_URL")} under Environment in the Render dashboard`);
		(0, __clack_prompts.note)(steps.join("\n"), "Render — complete setup in the dashboard");
		return Promise.resolve();
	}
};
var render_default = render;

//#endregion
//#region src/deploy/recipes/index.ts
function loadRecipes() {
	return [
		railway_default,
		fly_default,
		render_default
	];
}

//#endregion
//#region src/constants/ThunderRepo.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
*
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/
const ThunderRepo = {
	DOMAIN: "thunderid.dev",
	REPO: "thunder-id/thunderid",
	HANDLE: "thunderid"
};
var ThunderRepo_default = ThunderRepo;

//#endregion
//#region src/download.ts
const PLATFORM_MAP = {
	darwin: "macos",
	linux: "linux",
	win32: "win"
};
const ARCH_MAP = {
	x64: "x64",
	arm64: "arm64"
};
const RELEASES_URL = `https://${ThunderRepo_default.DOMAIN}/data/releases.json`;
function getPlatformAsset(version) {
	const platform = PLATFORM_MAP[process.platform];
	const arch = ARCH_MAP[process.arch];
	if (!platform || !arch) throw new Error(`Unsupported platform: ${process.platform}/${process.arch}`);
	return `${ThunderRepo_default.HANDLE}-${version}-${platform}-${arch}.zip`;
}
function fetchWithRedirects(url) {
	return new Promise((resolve, reject) => {
		https.get(url, { headers: { "User-Agent": "thunderid-npx" } }, (res) => {
			if (res.statusCode === 301 || res.statusCode === 302) {
				fetchWithRedirects(res.headers.location).then(resolve, reject);
				return;
			}
			if (res.statusCode !== 200) {
				reject(/* @__PURE__ */ new Error(`HTTP ${res.statusCode} for ${url}`));
				return;
			}
			resolve(res);
		}).on("error", reject);
	});
}
function fetchJson(url) {
	return new Promise((resolve, reject) => {
		https.get(url, { headers: { "User-Agent": "thunderid-npx" } }, (res) => {
			if (res.statusCode === 301 || res.statusCode === 302) {
				fetchJson(res.headers.location).then(resolve, reject);
				return;
			}
			if (res.statusCode !== 200) {
				reject(/* @__PURE__ */ new Error(`HTTP ${res.statusCode} for ${url}`));
				return;
			}
			let body = "";
			res.on("data", (chunk) => {
				body += chunk;
			});
			res.on("end", () => {
				try {
					resolve(JSON.parse(body));
				} catch (err) {
					reject(err instanceof Error ? err : new Error(String(err)));
				}
			});
		}).on("error", reject);
	});
}
async function fetchReleasesData() {
	try {
		return await fetchJson(RELEASES_URL);
	} catch {
		const gh = await fetchJson(`https://api.github.com/repos/${ThunderRepo_default.REPO}/releases/latest`);
		if (!gh.tag_name) throw new Error("tag_name missing from GitHub release response");
		const release = {
			tagName: gh.tag_name,
			isLatest: true,
			assets: (gh.assets ?? []).map((a) => ({
				name: a.name,
				downloadUrl: a.browser_download_url
			}))
		};
		return {
			latestRelease: release,
			releases: [release]
		};
	}
}
async function downloadFile(url, destPath, onProgress) {
	const res = await fetchWithRedirects(url);
	const total = parseInt(res.headers["content-length"] ?? "0", 10);
	let received = 0;
	await new Promise((resolve, reject) => {
		const file = fs.createWriteStream(destPath);
		res.on("data", (chunk) => {
			received += chunk.length;
			if (total && onProgress) onProgress(received, total);
		});
		res.pipe(file);
		file.on("finish", () => file.close(() => resolve()));
		file.on("error", reject);
		res.on("error", reject);
	});
}
function extractZip(zipPath, destDir) {
	fs.mkdirSync(destDir, { recursive: true });
	if (process.platform === "win32") (0, child_process.execSync)(`tar -xf "${zipPath}" -C "${destDir}"`, { stdio: "pipe" });
	else (0, child_process.execSync)(`unzip -o "${zipPath}" -d "${destDir}"`, { stdio: "pipe" });
}
async function downloadAndExtract(version, destDir, onStatus) {
	const assetName = getPlatformAsset(version);
	const data = await fetchReleasesData();
	const asset = (data.releases.find((r) => r.tagName === `v${version}`) ?? data.latestRelease).assets.find((a) => a.name === assetName);
	if (!asset) throw new Error(`No release asset found for ${assetName}`);
	const zipPath = path.join(os.tmpdir(), assetName);
	onStatus?.(`Downloading Thunder v${version} for ${process.platform}/${process.arch}`);
	await downloadFile(asset.downloadUrl, zipPath, (received, total) => {
		const pct = Math.round(received / total * 100);
		onStatus?.(`Downloading Thunder v${version} — ${pct}%`);
	});
	onStatus?.("Extracting...");
	extractZip(zipPath, destDir);
	try {
		fs.unlinkSync(zipPath);
	} catch {}
}
async function getLatestThunderVersion() {
	const tag = (await fetchReleasesData()).latestRelease.tagName;
	if (!tag) throw new Error("tagName missing from releases data");
	return tag.replace(/^v/, "");
}

//#endregion
//#region src/state.ts
const STATE_DIR = path.join(os.homedir(), ".thunderid");
const STATE_FILE = path.join(STATE_DIR, "state.json");
function normalizeState(rawState) {
	if (!rawState || typeof rawState !== "object") return {
		installs: {},
		lastUsedVersion: null
	};
	const raw = rawState;
	if (raw["installs"] && typeof raw["installs"] === "object") return {
		installs: raw["installs"],
		lastUsedVersion: raw["lastUsedVersion"] || null
	};
	if (typeof raw["version"] === "string" && typeof raw["installPath"] === "string") return {
		installs: { [raw["version"]]: {
			installPath: raw["installPath"],
			setupComplete: Boolean(raw["setupComplete"]),
			installedAt: raw["installedAt"] || (/* @__PURE__ */ new Date()).toISOString()
		} },
		lastUsedVersion: raw["version"]
	};
	return {
		installs: {},
		lastUsedVersion: null
	};
}
function readState() {
	try {
		return normalizeState(JSON.parse(fs.readFileSync(STATE_FILE, "utf8")));
	} catch {
		return normalizeState(null);
	}
}
function writeState(version, installPath, setupComplete = false) {
	const currentState = readState();
	const nextState = {
		installs: {
			...currentState.installs,
			[version]: {
				installPath,
				setupComplete,
				installedAt: currentState.installs[version]?.installedAt || (/* @__PURE__ */ new Date()).toISOString()
			}
		},
		lastUsedVersion: version
	};
	fs.mkdirSync(STATE_DIR, { recursive: true });
	fs.writeFileSync(STATE_FILE, JSON.stringify(nextState, null, 2));
}
function markSetupComplete(version) {
	const currentState = readState();
	const versionEntry = currentState.installs[version];
	if (!versionEntry) return;
	const nextState = {
		installs: {
			...currentState.installs,
			[version]: {
				...versionEntry,
				setupComplete: true
			}
		},
		lastUsedVersion: version
	};
	fs.mkdirSync(STATE_DIR, { recursive: true });
	fs.writeFileSync(STATE_FILE, JSON.stringify(nextState, null, 2));
}

//#endregion
//#region src/deploy/index.ts
function getDeploymentYamlContent() {
	return [
		"server:",
		"  hostname: \"0.0.0.0\"",
		"  port: __SERVER_PORT__",
		"  http_only: true",
		"  public_url: \"__PUBLIC_URL__\"",
		"",
		"gate_client:",
		"  hostname: \"__PUBLIC_HOST__\"",
		"  port: __GATE_PORT__",
		"  scheme: \"__GATE_SCHEME__\"",
		"  path: \"/gate\"",
		"",
		"cors:",
		"  allowed_origins:",
		"    - \"__PUBLIC_URL__\"",
		"",
		"passkey:",
		"  allowed_origins:",
		"    - \"__PUBLIC_URL__\""
	].join("\n") + "\n";
}
function getDockerfileContent(version) {
	const dirName = `thunder-${version}-linux-x64`;
	return `FROM alpine:3.19
RUN apk add --no-cache sqlite openssl ca-certificates bash curl unzip lsof

RUN mkdir -p /app \\
    && curl -fsSL -o /tmp/thunder.zip \\
       "https://github.com/asgardeo/thunder/releases/download/v${version}/${dirName}.zip" \\
    && unzip /tmp/thunder.zip -d /app \\
    && rm /tmp/thunder.zip

WORKDIR /app/${dirName}

# Replace the bundled deployment.yaml with a cloud-ready template.
# Placeholders are substituted at runtime by entrypoint.sh using provider env vars.
COPY .thunderdeploy/deployment.yaml repository/conf/deployment.yaml

RUN addgroup -S thunder && adduser -S thunder -G thunder \\
    && chown -R thunder:thunder .

COPY .thunderdeploy/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER thunder
EXPOSE 8090
ENTRYPOINT ["/entrypoint.sh"]
`;
}
function getEntrypointContent() {
	return `#!/bin/bash
set -e

# Resolve the public URL from provider-injected environment variables.
# Each platform sets a different variable; we normalise them into PUBLIC_URL.
# Users can also set PUBLIC_URL explicitly to override auto-detection.
if [ -z "$PUBLIC_URL" ]; then
  if [ -n "$RAILWAY_PUBLIC_DOMAIN" ]; then
    PUBLIC_URL="https://$RAILWAY_PUBLIC_DOMAIN"
  elif [ -n "$RENDER_EXTERNAL_URL" ]; then
    PUBLIC_URL="$RENDER_EXTERNAL_URL"
  elif [ -n "$FLY_APP_NAME" ]; then
    PUBLIC_URL="https://$FLY_APP_NAME.fly.dev"
  fi
fi

# Railway (and other platforms) inject PORT — use it so the proxy routes to the right port.
SERVER_PORT="\${PORT:-8090}"

# Fill in deployment.yaml placeholders with the resolved public URL and port.
DEPLOY_YAML="repository/conf/deployment.yaml"
if [ -n "$PUBLIC_URL" ]; then
  PUBLIC_HOST=$(echo "$PUBLIC_URL" | sed 's|https://||; s|http://||; s|[:/].*||')
  if echo "$PUBLIC_URL" | grep -q "^https://"; then
    GATE_SCHEME="https"
    GATE_PORT="443"
  else
    GATE_SCHEME="http"
    GATE_PORT="$SERVER_PORT"
  fi
else
  PUBLIC_URL="http://localhost:$SERVER_PORT"
  PUBLIC_HOST="localhost"
  GATE_SCHEME="http"
  GATE_PORT="$SERVER_PORT"
fi
sed -i "s|__PUBLIC_URL__|$PUBLIC_URL|g" "$DEPLOY_YAML"
sed -i "s|__PUBLIC_HOST__|$PUBLIC_HOST|g" "$DEPLOY_YAML"
sed -i "s|__GATE_SCHEME__|$GATE_SCHEME|g" "$DEPLOY_YAML"
sed -i "s|__GATE_PORT__|$GATE_PORT|g" "$DEPLOY_YAML"
sed -i "s|__SERVER_PORT__|$SERVER_PORT|g" "$DEPLOY_YAML"

# Use /data as sentinel location when a volume is mounted (e.g. Fly.io SQLite),
# otherwise fall back to WORKDIR (resets on redeploy, which is correct since the DB does too).
if [ -d "/data" ]; then
  SENTINEL="/data/.thunder-setup-complete"
else
  SENTINEL=".setup-complete"
fi

if [ ! -f "$SENTINEL" ]; then
  # setup.sh reads hostname from deployment.yaml to build its BASE_URL for health polling.
  # "0.0.0.0" is the right binding address for the server but is not a valid client destination —
  # curl to http://0.0.0.0:8090 fails or times out on every retry, stalling setup for minutes.
  # Swap to localhost just for the setup phase, then restore the binding address afterwards.
  sed -i 's|hostname: "0.0.0.0"|hostname: "localhost"|g' "$DEPLOY_YAML"
  THUNDER_SKIP_SECURITY=true bash setup.sh
  sed -i 's|hostname: "localhost"|hostname: "0.0.0.0"|g' "$DEPLOY_YAML"
  touch "$SENTINEL"
  # In newer Thunder versions, setup.sh invokes start.sh internally and captures that PID.
  # Killing start.sh leaves the Thunder binary and the embedded OpenFGA server as orphans.
  # start.sh refuses to run if either port is occupied, which exits the container → 502.
  lsof -ti tcp:"$SERVER_PORT" 2>/dev/null | xargs kill -9 2>/dev/null || true
  lsof -ti tcp:9090 2>/dev/null | xargs kill -9 2>/dev/null || true
  sleep 1
fi

# Patch config.js files AFTER setup so that setup.sh cannot overwrite the changes.
# Only patch when the public domain is actually resolved (RAILWAY_PUBLIC_DOMAIN etc. may not be
# injected on the very first container start for a brand-new service). Track the last-patched
# hostname in a stamp file so we re-apply whenever the domain changes between restarts.
if [ -d "/data" ]; then
  DOMAIN_STAMP="/data/.thunder-patched-domain"
else
  DOMAIN_STAMP=".thunder-patched-domain"
fi
LAST_DOMAIN=$(cat "$DOMAIN_STAMP" 2>/dev/null || echo "")

if [ "$PUBLIC_HOST" != "localhost" ] && [ "$PUBLIC_HOST" != "$LAST_DOMAIN" ]; then
  for CONFIG_FILE in apps/console/config.js apps/gate/config.js; do
    if [ -f "$CONFIG_FILE" ]; then
      # Replace any quoted hostname value (handles localhost and previously-patched domains).
      sed -i "s|hostname: '[^']*'|hostname: '$PUBLIC_HOST'|g" "$CONFIG_FILE"
      # Replace any numeric port value in the server block.
      sed -i "s|port: [0-9]*|port: $GATE_PORT|g" "$CONFIG_FILE"
      # Set http_only to match the actual scheme (Thunder now ships with http_only: true).
      if [ "$GATE_SCHEME" = "https" ]; then
        sed -i "s|http_only: true|http_only: false|g" "$CONFIG_FILE"
      else
        sed -i "s|http_only: false|http_only: true|g" "$CONFIG_FILE"
      fi
    fi
  done
  echo "$PUBLIC_HOST" > "$DOMAIN_STAMP"
fi

# Forward the resolved port to start.sh so Thunder binds on Railway's expected port.
export BACKEND_PORT="$SERVER_PORT"
exec bash start.sh
`;
}
function isCLIAvailable(cliName) {
	if (!cliName) return true;
	const result = (0, child_process.spawnSync)(cliName, ["--version"], { stdio: "pipe" });
	return !result.error && result.status === 0;
}
async function ensureCLI(recipe) {
	if (!recipe.cliName || isCLIAvailable(recipe.cliName)) return;
	(0, __clack_prompts.note)(`${picocolors.default.cyan(recipe.cliName)} is not installed.\n\nInstall command:\n  ${picocolors.default.bold(recipe.installCmd)}`, `${recipe.displayName} — setup needed`);
	const shouldInstall = await (0, __clack_prompts.confirm)({
		message: `Install ${picocolors.default.cyan(recipe.cliName)} now?`,
		initialValue: true
	});
	if ((0, __clack_prompts.isCancel)(shouldInstall) || !shouldInstall) {
		(0, __clack_prompts.cancel)(`Install ${recipe.cliName} and re-run to continue.`);
		process.exit(0);
	}
	if (!recipe.installCmd) return;
	const s = (0, __clack_prompts.spinner)();
	s.start(`Installing ${recipe.cliName}...`);
	try {
		(0, child_process.execSync)(recipe.installCmd, { stdio: "pipe" });
		s.stop(`${recipe.cliName} installed`);
	} catch (err) {
		s.stop(`Install failed: ${err.message}`);
		(0, __clack_prompts.note)(`Run this manually, then re-run deploy:\n  ${picocolors.default.bold(recipe.installCmd)}`, "Manual install needed");
		process.exit(1);
	}
	if (recipe.postInstallPath) process.env["PATH"] = `${recipe.postInstallPath}${path.delimiter}${process.env["PATH"]}`;
	if (!isCLIAvailable(recipe.cliName)) {
		(0, __clack_prompts.note)(`Installed but ${picocolors.default.cyan(recipe.cliName)} isn't on PATH yet.\n\nRestart your terminal, then run:\n  ${picocolors.default.bold("npx thunderid deploy")}`, "Restart terminal needed");
		process.exit(0);
	}
}
async function deploy() {
	console.clear();
	(0, __clack_prompts.intro)(picocolors.default.bold(`⚡ ${Product_default.NAME}`) + picocolors.default.dim(" — Deploy"));
	let version;
	const localState = readState();
	if (localState.lastUsedVersion) {
		version = localState.lastUsedVersion;
		(0, __clack_prompts.note)(`Deploying the version you tested locally: v${version}`, "Version");
	} else {
		const s = (0, __clack_prompts.spinner)();
		s.start("Fetching latest Thunder release...");
		try {
			version = await getLatestThunderVersion();
			s.stop(`Thunder v${version}`);
		} catch (err) {
			s.stop("Could not fetch latest Thunder release.");
			process.stderr.write(`\nError: ${err.message}\n`);
			process.exit(1);
		}
	}
	const recipes = loadRecipes();
	const availability = Object.fromEntries(recipes.map((r) => [r.id, isCLIAvailable(r.cliName)]));
	const recipeId = await (0, __clack_prompts.select)({
		message: "Deploy to which platform?",
		initialValue: "railway",
		options: [...recipes.filter((r) => !r.comingSoon).map((r) => ({
			value: r.id,
			label: r.displayName,
			hint: availability[r.id] ? r.description : `${r.description} — ${picocolors.default.yellow(`needs ${r.cliName}`)}`
		})), ...recipes.filter((r) => r.comingSoon).map((r) => ({
			value: r.id,
			label: picocolors.default.dim(r.displayName),
			hint: picocolors.default.dim("Coming soon"),
			disabled: true
		}))]
	});
	if ((0, __clack_prompts.isCancel)(recipeId)) {
		(0, __clack_prompts.cancel)("Deploy cancelled.");
		process.exit(0);
	}
	const recipe = recipes.find((r) => r.id === recipeId);
	if (!recipe) {
		(0, __clack_prompts.cancel)("Unknown recipe selected.");
		process.exit(1);
	}
	await ensureCLI(recipe);
	try {
		await recipe.preflight();
	} catch (err) {
		process.stderr.write(`\n${picocolors.default.red("Preflight failed:")} ${err.message}\n`);
		process.exit(1);
	}
	const dbType = await (0, __clack_prompts.select)({
		message: "Which database?",
		options: [{
			value: "sqlite",
			label: "SQLite",
			hint: "Embedded, zero-config (recommended)"
		}, {
			value: "postgres",
			label: "PostgreSQL / Supabase",
			hint: "External managed database"
		}]
	});
	if ((0, __clack_prompts.isCancel)(dbType)) {
		(0, __clack_prompts.cancel)("Deploy cancelled.");
		process.exit(0);
	}
	let dbUrl;
	if (dbType === "postgres") {
		const dbUrlInput = await (0, __clack_prompts.text)({
			message: "DATABASE_URL:",
			placeholder: "postgresql://user:pass@db.example.com/dbname",
			validate: (v) => v ? void 0 : "DATABASE_URL is required"
		});
		if ((0, __clack_prompts.isCancel)(dbUrlInput)) {
			(0, __clack_prompts.cancel)("Deploy cancelled.");
			process.exit(0);
		}
		dbUrl = dbUrlInput;
	}
	let appName;
	if (recipe.needsAppName !== false) {
		const defaultName = `thunder-${Math.random().toString(36).slice(2, 7)}`;
		const appNameInput = await (0, __clack_prompts.text)({
			message: "App name:",
			placeholder: defaultName,
			defaultValue: defaultName
		});
		if ((0, __clack_prompts.isCancel)(appNameInput)) {
			(0, __clack_prompts.cancel)("Deploy cancelled.");
			process.exit(0);
		}
		appName = appNameInput || defaultName;
	}
	const deployDir = path.join(process.cwd(), ".thunderdeploy");
	fs.mkdirSync(deployDir, { recursive: true });
	fs.writeFileSync(path.join(deployDir, "deployment.yaml"), getDeploymentYamlContent(), "utf8");
	fs.writeFileSync(path.join(deployDir, "entrypoint.sh"), getEntrypointContent(), "utf8");
	const dockerfilePath = path.join(process.cwd(), "Dockerfile");
	if (fs.existsSync(dockerfilePath)) (0, __clack_prompts.note)("Existing Dockerfile found — it will be overwritten.", "Warning");
	fs.writeFileSync(dockerfilePath, getDockerfileContent(version), "utf8");
	try {
		await recipe.deploy({
			appName,
			dbType,
			dbUrl,
			thunderVersion: version
		});
	} catch (err) {
		process.stderr.write(`\n${picocolors.default.red("Deploy failed:")} ${err.message}\n`);
		process.exit(1);
	}
	(0, __clack_prompts.outro)(picocolors.default.green(`${Product_default.NAME} v${version} deployed${appName ? ` as ${picocolors.default.bold(appName)}` : ""}`));
}

//#endregion
//#region src/setup.ts
const isWindows = process.platform === "win32";
function findSetupScript(installPath) {
	const scriptName = isWindows ? "setup.ps1" : "setup.sh";
	const rootScript = path.join(installPath, scriptName);
	if (fs.existsSync(rootScript)) return rootScript;
	for (const entry of fs.readdirSync(installPath)) {
		const nested = path.join(installPath, entry, scriptName);
		if (fs.existsSync(nested)) return nested;
	}
	return null;
}
function findThunderRoot(installPath) {
	const setupScript = findSetupScript(installPath);
	if (!setupScript) return null;
	return path.dirname(setupScript);
}
function runSetup(installPath, args = []) {
	const thunderRoot = findThunderRoot(installPath);
	if (!thunderRoot) throw new Error(`setup script not found in ${installPath}`);
	if (isWindows) (0, child_process.execFileSync)("powershell.exe", [
		"-ExecutionPolicy",
		"Bypass",
		"-File",
		"setup.ps1",
		...args
	], {
		cwd: thunderRoot,
		stdio: "inherit"
	});
	else (0, child_process.execFileSync)("bash", ["setup.sh", ...args], {
		cwd: thunderRoot,
		stdio: "inherit"
	});
}
function runStart(installPath, args = []) {
	const thunderRoot = findThunderRoot(installPath);
	if (!thunderRoot) throw new Error(`Thunder installation not found in ${installPath}`);
	if (isWindows) {
		const startPs1 = path.join(thunderRoot, "start.ps1");
		if (fs.existsSync(startPs1)) {
			(0, child_process.execFileSync)("powershell.exe", [
				"-ExecutionPolicy",
				"Bypass",
				"-File",
				"start.ps1",
				...args
			], {
				cwd: thunderRoot,
				stdio: "inherit"
			});
			return;
		}
		const binary$1 = path.join(thunderRoot, "thunderid.exe");
		if (fs.existsSync(binary$1)) {
			(0, child_process.execFileSync)(binary$1, args, {
				cwd: thunderRoot,
				stdio: "inherit"
			});
			return;
		}
		throw new Error(`No start.ps1 or thunderid.exe found in ${thunderRoot}`);
	}
	const startScript = path.join(thunderRoot, "start.sh");
	if (fs.existsSync(startScript)) {
		(0, child_process.execFileSync)("bash", ["start.sh", ...args], {
			cwd: thunderRoot,
			stdio: "inherit"
		});
		return;
	}
	const binary = path.join(thunderRoot, "thunder");
	if (fs.existsSync(binary)) {
		(0, child_process.execFileSync)(binary, args, {
			cwd: thunderRoot,
			stdio: "inherit"
		});
		return;
	}
	throw new Error(`No start.sh or thunder binary found in ${thunderRoot}`);
}

//#endregion
//#region src/index.ts
function parseCliArgs(argv) {
	let forceSetup = false;
	const forwardedArgs = [];
	for (const arg of argv) {
		if (arg === "--setup") {
			forceSetup = true;
			continue;
		}
		forwardedArgs.push(arg);
	}
	return {
		forceSetup,
		forwardedArgs
	};
}
async function main() {
	const rawArgs = process.argv.slice(2);
	if (rawArgs[0] === "deploy") {
		await deploy();
		return;
	}
	console.clear();
	const { forceSetup, forwardedArgs } = parseCliArgs(rawArgs);
	const s = (0, __clack_prompts.spinner)();
	s.start("Fetching latest Thunder release...");
	let VERSION;
	try {
		VERSION = await getLatestThunderVersion();
		s.stop(`Latest Thunder release: v${VERSION}`);
	} catch (err) {
		s.stop("Could not fetch latest Thunder release.");
		process.stderr.write(`\nError: ${err.message}\n`);
		process.exit(1);
	}
	const versionState = readState().installs[VERSION];
	const alreadyInstalled = Boolean(versionState?.installPath && fs.existsSync(versionState.installPath));
	const BRAND_BLUE = "\x1B[38;2;54;136;255m";
	const RESET = "\x1B[0m";
	const GREY = "\x1B[38;2;128;128;128m";
	const thunderLines = [
		" _____ _                     _           ",
		"|_   _| |                   | |          ",
		"  | | | |__  _   _ _ __   __| | ___ _ __ ",
		"  | | | '_ \\| | | | '_ \\ / _` |/ _ \\ '__|",
		"  | | | | | | |_| | | | | (_| |  __/ |   ",
		"  \\_/ |_| |_|\\__,_|_| |_|\\__,_|\\___|_|   "
	];
	const idLines = [
		" ___________ ",
		"|_   _|  _  \\",
		"  | | | | | |",
		"  | | | | | |",
		" _| |_| |/ / ",
		" \\___/|___/  "
	];
	(0, __clack_prompts.intro)(`\n${thunderLines.map((t, i) => `  ${BRAND_BLUE}${t}${RESET}${GREY}${idLines[i]}${RESET}`).join("\n")}\n\n${picocolors.default.dim("· High-performance open-source identity stack, engineered for developers")}\n`);
	let installPath;
	if (alreadyInstalled && versionState.setupComplete && !forceSetup) {
		installPath = versionState.installPath;
		(0, __clack_prompts.note)(`${Product_default.NAME} v${VERSION} is ready\n${installPath}`, `Starting ${Product_default.NAME}`);
		try {
			runStart(installPath, forwardedArgs);
		} catch (err) {
			process.stderr.write(`\nFailed to start ${Product_default.NAME}: ${err.message}\n`);
			process.exit(1);
		}
		return;
	}
	if (alreadyInstalled) {
		installPath = versionState.installPath;
		if (forceSetup) (0, __clack_prompts.note)(`Re-running setup for ${Product_default.NAME} v${VERSION}\n${installPath}`, "Setup requested");
		else (0, __clack_prompts.note)(`Using ${Product_default.NAME} v${VERSION}\n${installPath}`, "Already installed");
	} else {
		const defaultPath = path.join(process.cwd(), VERSION);
		const rawInstallPath = await (0, __clack_prompts.text)({
			message: "Install directory",
			placeholder: defaultPath,
			defaultValue: defaultPath
		});
		if ((0, __clack_prompts.isCancel)(rawInstallPath)) {
			(0, __clack_prompts.cancel)("Installation cancelled.");
			process.exit(0);
		}
		installPath = rawInstallPath || defaultPath;
		const dl = (0, __clack_prompts.spinner)();
		dl.start(`Downloading Thunder v${VERSION}...`);
		try {
			await downloadAndExtract(VERSION, installPath, (msg) => dl.message(msg));
		} catch (err) {
			dl.stop("Download failed.");
			process.stderr.write(`\nError: ${err.message}\n`);
			process.exit(1);
		}
		dl.stop(`${Product_default.NAME} v${VERSION} installed to ${installPath}`);
		writeState(VERSION, installPath);
		(0, __clack_prompts.outro)(`Running ${Product_default.NAME} setup for the first time...`);
	}
	try {
		runSetup(installPath, forwardedArgs);
		markSetupComplete(VERSION);
	} catch (err) {
		process.stderr.write(`\nSetup failed: ${err.message}\n`);
		process.exit(1);
	}
	(0, __clack_prompts.note)(`Setup complete for ${Product_default.NAME} v${VERSION}\n${installPath}`, `Starting ${Product_default.NAME}`);
	try {
		runStart(installPath, forwardedArgs);
	} catch (err) {
		process.stderr.write(`\nSetup succeeded but failed to start ${Product_default.NAME}: ${err.message}\n`);
		process.exit(1);
	}
}
main();

//#endregion