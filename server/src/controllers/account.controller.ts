"use strict";

// Custom Modules
import fString from "../modules/fString.module";

// Types
import { Request, Response, NextFunction } from "express";
import { HttpStatus, PayloadVerificationCode } from "../types";

// Services
import accountService from "../services/account.service";
import verifCodeService from "../services/verifCode.service";

// Config
import config from "../config";

const accountController = {
    signupStep1: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountEmail = req.res.locals.accountEmail;

            const payload: PayloadVerificationCode = {
                accountEmail: accountEmail,
            };
            
            await verifCodeService.sendCode("verifyAccountEmail", payload);

            return res
                    .status(HttpStatus.OK)
                    .json({
                        status: HttpStatus.OK,
                        message: fString(config.messages.http._200.sent, { element: "Verification Code" }),
                    });
        } catch (error) {
            next(error);
        }
    },
    signupStep2: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const verifCodeID = req.res.locals.verifCodeID;
            const accountEmail = req.res.locals.accountEmail;
            const password = req.res.locals.password;

            const account = await accountService.signupStep2(verifCodeID, accountEmail, password);

            return res
                    .status(HttpStatus.CREATED)
                    .json({
                        status: HttpStatus.CREATED,
                        message: fString(config.messages.http._200.created, { element: "Account" }),
                        data: {
                            accountId: account.id,
                            accountEmail: account.email,
                            role: account.role,
                            createdAt: account.createdAt,
                        },
                    });
        } catch (error) {
            next(error);
        }
    },
};

export default accountController;