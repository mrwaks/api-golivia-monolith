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
import verifCodeDB from "../database/dao/verifCode.db";
import accountDB from "../database/dao/account.db";

// Utils
import regexp from "../utils/regex.util";

const accountFilters = {
    signupStep1: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountEmail = req.body.accountEmail;

            if (!accountEmail) {
                throw new HTTP400Error(fString(config.messages.http._400.missing, { element: "Email" }));
            }
            // if (!isEmail(accountEmail)) {
            //     throw new HTTP400Error(fString(config.messages.http._400.invalid, { element: "Email" }));
            // }
            if (await accountDB.findAccount({ email: accountEmail })) {
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
            const { key, password1, password2 } = req.body;

            if (!key) {
                throw new HTTP400Error(fString(config.messages.http._400.missing, { element: "Verification Code Encrypted" }));
            }
            if (!password1) {
                throw new HTTP400Error(fString(config.messages.http._400.missing, { element: "Password1" }));
            }
            if (!password2) {
                throw new HTTP400Error(fString(config.messages.http._400.missing, { element: "Password2" }));
            }
    
            const keyDecrypted = JSON.parse(await crypto.decrypt(key)).toString();
            if (!regexp.isValidCode.test(keyDecrypted)) {
                throw new HTTP500Error();
            }
            const verificationCode = await verifCodeDB.findFirstCode({
                code: keyDecrypted,
            });
            if (!verificationCode) {
                throw new HTTP409Error(fString(config.messages.http._400.invalid, { element: "Key" }));
            }

            if (!regexp.isValidPassword.test(password1) || !regexp.isValidPassword.test(password1)) {
                throw new HTTP400Error(config.messages.http._400.invalidPassword);
            }

            if (password1 !== password2) {
                throw new HTTP400Error("password1 not equal to password2");
            }

            const accountEmail = JSON.parse(verificationCode.payload).accountEmail;

            res.locals.verifCodeID = verificationCode.id;
            res.locals.accountEmail = accountEmail;
            res.locals.password = password1;

            next();
        } catch (error) {
            next(error);
        }
    },
};

export default accountFilters;