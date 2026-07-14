export function createRouteMatcher(patterns) {
  const regexes = patterns.map((pattern) => {
    const regexStr = pattern.replace(/[.+^${}|[\]\\]/g, "\\$&").replace(/\*\*/g, "___DOUBLE_STAR___").replace(/\*/g, "[^/]*").replace(/___DOUBLE_STAR___/g, ".*");
    return new RegExp(`^${regexStr}$`);
  });
  return (path) => regexes.some((regex) => regex.test(path));
}
