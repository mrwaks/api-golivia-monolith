// ================ INTERFACE ================ //

import { RequestHandler } from "express";

export interface SystemError {
    address: string;
    code: string;
    dest: string;
    errno: number;
    info: object;
    message: string;
    path: string;
    port: number;
    syscall: string;
}

export interface Routes {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    controller: RequestHandler;
    filters?: RequestHandler[];
}

export interface PayloadVerificationCode {
    accountEmail: string;
}

// ================ ENUM ================ //

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    REDIRECTED = 302,
    BADREQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOTFOUND = 404,
    NOTALLOWED = 405,
    REQTIMEOUT = 408,
    CONFLICT = 409,
    TOMANYREQUEST = 429,
    INTERNSERVERR = 500,
}