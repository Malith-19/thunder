import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This sample lives inside a monorepo with other lockfiles. Pin the tracing
  // root to this folder so Next does not infer the repo root.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
