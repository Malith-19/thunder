import { ErrorCode } from "../errors/error-codes.js";
import { ThunderIDError } from "../errors/thunderid-error.js";
export function validateReturnUrl(url) {
  if (typeof url !== "string" || url.trim() === "") {
    throw new ThunderIDError("returnTo must be a non-empty string.", ErrorCode.OpenRedirectBlocked, { statusCode: 400 });
  }
  const trimmed = url.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    throw new ThunderIDError(
      `Open redirect blocked: returnTo "${trimmed}" must be a relative path starting with a single "/".`,
      ErrorCode.OpenRedirectBlocked,
      { statusCode: 400 }
    );
  }
  if (trimmed.length > 1 && trimmed[1] === "\\") {
    throw new ThunderIDError(
      `Open redirect blocked: returnTo "${trimmed}" contains a backslash.`,
      ErrorCode.OpenRedirectBlocked,
      { statusCode: 400 }
    );
  }
  const decoded = decodeURIComponent(trimmed.slice(1, 5).toLowerCase());
  if (decoded.startsWith("/") || decoded.startsWith("\\")) {
    throw new ThunderIDError(
      `Open redirect blocked: returnTo "${trimmed}" contains an encoded redirect sequence.`,
      ErrorCode.OpenRedirectBlocked,
      { statusCode: 400 }
    );
  }
  return trimmed;
}
export function safeReturnUrl(url, fallback = "/") {
  try {
    return validateReturnUrl(url);
  } catch {
    return fallback;
  }
}
