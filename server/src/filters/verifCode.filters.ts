"use strict";

// Types
import { NextFunction, Request, Response } from "express";

// Error Handler
import { HTTP400Error } from "../errorHandler";

// Custom Modules
import fString from "../modules/fString.module";

// Config
import config from "../config";

// Utils
import regexp from "../utils/regex.util";

// Database
import verifCodeDB from "../database/dao/verifCode.db";

const verifCodeFilters = {
    isValidCode: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const verifCode = req.body.verifCode;

            if (!verifCode) {
                throw new HTTP400Error(fString(config.messages.http._400.missing, { element: "Verification Code" }));
            }
            if (!regexp.isValidCode.test(verifCode)) {
                throw new HTTP400Error(fString(config.messages.http._400.invalid, { element: "Verification Code" }));
            }
            const isCodeExists = await verifCodeDB.findFirstCode({
                code: verifCode,
            });
            if (!isCodeExists) {
                throw new HTTP400Error(fString(config.messages.http._400.invalid, { element: "Verification Code" }));
            }
    
            res.locals.verifCode = verifCode;
            next();
        } catch (error) {
            next(error);
        }
    },
};

export default verifCodeFilters;