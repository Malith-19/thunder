const PREFIX = "@thunderid/nuxt";
export function maskToken(token) {
  if (!token) return "(empty)";
  if (token.length <= 8) return "***";
  return `${token.slice(0, 4)}\u2026${token.slice(-4)}`;
}
export function createLogger(subsystem) {
  const tag = `[${PREFIX}:${subsystem}]`;
  return {
    debug: (...args) => {
      if (process.env.THUNDERID_DEBUG) {
        console.log(tag, ...args);
      }
    },
    error: (...args) => {
      console.error(tag, ...args);
    },
    info: (...args) => {
      console.log(tag, ...args);
    },
    warn: (...args) => {
      console.warn(tag, ...args);
    }
  };
}
