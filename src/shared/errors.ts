export class JobbitKitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JobbitKitError";
  }
}

export class JobbitConfigError extends JobbitKitError {
  constructor(message: string) {
    super(message);
    this.name = "JobbitConfigError";
  }
}

export class JobbitApiError extends JobbitKitError {
  readonly status: number;
  readonly detail: unknown;

  constructor(message: string, status: number, detail?: unknown) {
    super(message);
    this.name = "JobbitApiError";
    this.status = status;
    this.detail = detail;
  }
}
