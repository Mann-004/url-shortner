export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    Error.captureStackTrace(this, this.constructor)
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401)
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404)
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict occurred") {
    super(message, 409)
  }
}

export class ServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500)
  }
}


export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  console.error("Unexpected error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  })
}
