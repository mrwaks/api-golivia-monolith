"use strict";

// Types
import { Request, Response, NextFunction } from "express";

// Error Handlers
import { HTTP400Error } from "../errorHandler";

const homeFilters = {
    isTrueMode: (req: Request, res: Response, next: NextFunction) => {
        if (req.query.mode !== "true") {
            throw new HTTP400Error("Bad mode");
        }
        next();
    },
    isColorRed: (req: Request, res: Response, next: NextFunction) => {
        if (req.query.color !== "red") {
            throw new HTTP400Error("Bad color");
        }
        next();
    },
};

export default homeFilters;