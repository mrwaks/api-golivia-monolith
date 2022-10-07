"use strict";

// Types
import { NextFunction, Request, Response } from "express";

// Error Handler
import { HTTP401Error } from "../errorHandler";

const auth = {
    
    admin: (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountId: number = req.session.accountId;
            const role: "ADMIN" = req.session.role;
            if (!accountId) {
                throw new HTTP401Error();
            }
            if (role !== "ADMIN") {
                throw new HTTP401Error();
            }
            next();
        } catch (error) {
            next(error);
        }
    },

    user: (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountId: number = req.session.accountId;
            const role: "USER" = req.session.role;
            if (!accountId) {
                throw new HTTP401Error();
            }
            if (role !== "USER") {
                throw new HTTP401Error();
            }
            next();
        } catch (error) {
            next(error);
        }
    },

};

export default auth;