"use strict";

// Custom Modules
import fString from "../modules/fString.module";

// Types
import { RequestHandler } from "express";

// Error Handler
import { HTTP400Error } from "../errorHandler"; 

// Utils
import regexp from "../utils/regex.util";

// Config
import config from "../config";

const noXss: RequestHandler = (req, res, next) => {
    try {
        const body = req.body;
        const query = req.query;
        const params = req.params;
        const datas = Object.entries({...body, ...query, ...params});

        datas.forEach(data => {
            const value = data[1];
            if (typeof value === "string") {
                if (regexp.xssDetect.test(value)) {
                    throw new HTTP400Error(fString(config.messages.http._400.notAllowed, { element: "Tags" }));
                }
            }
        });

        next();
    } catch (error) {
        next(error);
    }
};

export default noXss;