class ApiError {
  message: string;
  status: number;

  constructor(message: string, status: 400 | 401 | 404 | 500 ){
    this.message = message;
    this.status = status;
  }
}

export default ApiError;
