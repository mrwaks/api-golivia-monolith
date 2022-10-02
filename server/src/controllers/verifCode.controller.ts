"use strict";

// Custom Modules
import fString from "../modules/fString.module";

// Types
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../types";

// Services
import verifCodeService from "../services/verifCode.service";

// Config
import config from "../config";

const verifCodeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const verifCode = req.res.locals.verifCode;

        const payload = await verifCodeService.sendClientPayload(verifCode);

        return res
                .status(HttpStatus.OK)
                .json({
                    status: HttpStatus.OK,
                    message: fString(config.messages.http._200.valid, { element: "Verification Code" }),
                    data: payload,
                });
    } catch (error) {
        next(error);
    }
}

export default verifCodeController;