"use strict";

// Types
import { Request, Response, NextFunction } from "express";

// Config
import config from "../config";

// Error Handler
import { HTTP401Error } from "../errorHandler";

const adminFilters = {
    isAdminKeyValid: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const adminKey = req.headers.authorization;

            if (config.environmentVariables.admin.key !== adminKey) {
                throw new HTTP401Error();
            }
    
            next();
        } catch (error) {
            next(error);
        }
    },
};

export default adminFilters;