export class ThunderIDError extends Error {
  code;
  statusCode;
  cause;
  context;
  constructor(message, code, opts) {
    super(message);
    this.name = "ThunderIDError";
    this.code = code;
    this.statusCode = opts?.statusCode;
    this.cause = opts?.cause;
    this.context = opts?.context;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
