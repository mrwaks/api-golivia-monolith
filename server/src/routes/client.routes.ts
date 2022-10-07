"use strict";

// Types
import { NextFunction, Request, Response } from "express";
import { Routes } from "../types";

// Core Modules
import { createReadStream } from "fs";
import { join } from "path";

const clientRoutes: Routes[] = [
    {
        url: "/account/signin",
        method: "GET",
        auth: false,
        controller: async (req: Request, res: Response, next: NextFunction) => {
            try {
                const readStream = createReadStream(join(__dirname, "../../../client/index.html"));
                res.status(200);
                res.setHeader("Content-Type", "text/html");
                return readStream.pipe(res);
            } catch (error) {
                next(error);
            }
        },
    },
    {
        url: "/account/main.js",
        method: "GET",
        auth: false,
        controller: async (req: Request, res: Response, next: NextFunction) => {
            try {
                const readStream = createReadStream(join(__dirname, "../../../client/main.js"));
                res.status(200);
                res.setHeader("Content-Type", "text/javascript");
                return readStream.pipe(res);
            } catch (error) {
                next(error);
            }
        }
    },
];

export default clientRoutes;