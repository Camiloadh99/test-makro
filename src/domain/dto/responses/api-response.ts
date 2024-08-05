class ApiResponse<T = any> {
  [x: string]: unknown;
  status: number;
  result: T;

  constructor(status: number, result: T) {
    this.result = result;
    this.status = status || 200;
  }
}

export { ApiResponse };
