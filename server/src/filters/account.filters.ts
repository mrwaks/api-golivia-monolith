"use strict";

// Npm Modules
import isEmail from "validator/lib/isEmail";

// Custom Modules
import isDisposableEmail from "../modules/checkDisposableEmail.module";
import fString from "../modules/fString.module";

// Types
import { Request, Response, NextFunction } from "express";

// Error Handler
import { HTTP400Error, HTTP409Error, HTTP500Error } from "../errorHandler";

// Config
import config from "../config";
import crypto from "../config/crypto.config";

// Database
import VerifCode from "../database/dao/verifCode.db";
import Account from "../database/dao/account.db";

// Utils
import regexp from "../utils/regex.util";

const accountFilters = {
    signupStep1: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountEmail = req.body.accountEmail;

            if (!accountEmail) {
                throw new HTTP400Error(fString(config.messages.http._400.missing, { element: "Email" }));
            }
            if (config.environmentVariables.env.inProd) {
                if (!isEmail(accountEmail)) {
                    throw new HTTP400Error(fString(config.messages.http._400.invalid, { element: "Email" }));
                }
            }
            if (await Account.find({ email: accountEmail })) {
                throw new HTTP409Error(fString(config.messages.http._409.alreadyExists, { element: "Account" }));
            }
            if (await isDisposableEmail(accountEmail)) {
                throw new HTTP400Error(fString(config.messages.http._400.notAllowed, { element: "Disposable Email" }));
            }
    
            res.locals.accountEmail = accountEmail;
            next();
        } catch (error) {
            next(error);
        }
    },
    signupStep2: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = {
                key: req.body.key,
                password1: req.body.password1,
                password2: req.body.password2,
            };

            Object.entries(body).forEach(entry => {
                const key = entry[0];
                const value = entry[1];

                if (!value) {
                    throw new HTTP400Error(fString(config.messages.http._400.missing, { element: key }));
                }
            })
    
            const keyDecrypted = JSON.parse(await crypto.decrypt(body.key)).toString();
            if (!regexp.isValidCode.test(keyDecrypted)) {
                throw new HTTP500Error();
            }
            const verificationCode = await VerifCode.find({
                code: keyDecrypted,
            });
            if (!verificationCode) {
                throw new HTTP409Error(fString(config.messages.http._400.invalid, { element: "Key" }));
            }

            if (!regexp.isValidPassword.test(body.password1) || !regexp.isValidPassword.test(body.password1)) {
                throw new HTTP400Error(config.messages.http._400.invalidPassword);
            }
            if (body.password1 !== body.password2) {
                throw new HTTP400Error("password1 not equal to password2");
            }

            const accountEmail = JSON.parse(verificationCode.payload).accountEmail;

            res.locals.verifCodeID = verificationCode.id;
            res.locals.accountEmail = accountEmail;
            res.locals.password = body.password1;

            next();
        } catch (error) {
            next(error);
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = {
                accountEmail: req.body.accountEmail,
                password: req.body.password,
            };

            Object.entries(body).forEach(entry => {
                const key = entry[0];
                const value = entry[1];

                if (!value) {
                    throw new HTTP400Error(fString(config.messages.http._400.missing, { element: key }));
                }
            });

            res.locals.accountEmail = body.accountEmail;
            res.locals.password = body.password;
            
            next();
        } catch (error) {
            next(error);
        }
    },
};

export default accountFilters;