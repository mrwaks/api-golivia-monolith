"use strict";

// Npm Modules
import { Prisma } from "@prisma/client";

// Custom Modules
import fString from "../modules/fString.module";

// Error Handlers
import prismaClientError from "./PrismaClientError";

// Types
import { HttpStatus } from "../types";
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

// Config
import config from "../config";

class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatus;
    public readonly isOperational: boolean;

    constructor(name: string, httpCode: HttpStatus, description: string, isOperational: boolean) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}

export const errorHandler = {
    returnError: (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof BaseError) {
            const statusCode = error.httpCode || 500;
            return res
                    .status(statusCode)
                    .json({
                        status: statusCode,
                        message: error.message,
                    });
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            const PrismaError = prismaClientError(error);
            const statusCode = PrismaError.status || 500;
            return res
                    .status(statusCode)
                    .json({
                        status: statusCode,
                        message: PrismaError.message,
                    });
        }
        if (error instanceof Error) {
            return res
                    .status(HttpStatus.INTERNSERVERR)
                    .json({ 
                        message: config.messages.http._500.internServErr,
                    });
        }
    },
    get404: (req: Request, res: Response) => {
        return res
                .status(HttpStatus.NOTFOUND)
                .json({
                    status: HttpStatus.NOTFOUND,
                    message: fString(config.messages.http._404.notFound, { element: "Page" }),
                });
    },
};

/** Http bad request error. */
export class HTTP400Error extends BaseError {
    constructor(description = "Bad Request") {
        super("BAD REQUEST", HttpStatus.BADREQUEST, description, true);
    }
}

/** Http unauthorized error. */
export class HTTP401Error extends BaseError {
    constructor(description = "Unauthorized") {
        super("UNAUTHORIZED", HttpStatus.UNAUTHORIZED, description, true);
    }
}

/** Http forbidden error. */
export class HTTP403Error extends BaseError {
    constructor(description = "Forbidden") {
        super("FORBIDDEN", HttpStatus.FORBIDDEN, description, true);
    }
}

/** Http found error. */
export class HTTP404Error extends BaseError {
    constructor(description = "Not Found") {
        super("NOT FOUND", HttpStatus.NOTFOUND, description, true);
    }
}

/** Http conflict. */
export class HTTP409Error extends BaseError {
    constructor(description = "Conflict") {
        super("CONFLICT", HttpStatus.CONFLICT, description, true);
    }
}

/** Http too many request error. */
export class HTTP429Error extends BaseError {
    constructor(description = "Too many requests") {
        super("TOO MANY REQUESTS", HttpStatus.TOMANYREQUEST, description, true);
    }
}

/** Http internal server error. */
export class HTTP500Error extends BaseError {
    constructor(description = "Internal Server Error") {
        super("INTERNAL SERVER ERROR", HttpStatus.INTERNSERVERR, description, true);
    }
}