class Exception extends Error {
  private status: number;
  private error: string;
  private path: string;

  constructor(status: number, error: string | any, path: string) {
    super(error);
    Object.setPrototypeOf(this, Exception.prototype);

    this.status = status;
    this.error = error;
    this.path = path;
  }

  public getStatus() {
    return this.status || 500;
  }

  public getMessage() {
    return this.error || 'Internal Server Error (500)';
  }

  public getPath() {
    return this.path || 'localhost:3000';
  }
}

export default Exception;
