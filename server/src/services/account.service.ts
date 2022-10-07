"use strict";

// Npm Modules
import bcrypt from "bcrypt";

// Database
import Account from "../database/dao/Account.db";
import VerifCode from "../database/dao/VerifCode.db";

// Error Handler
import { HTTP401Error } from "../errorHandler";

const accountService = {
    signupStep2: async (verifCodeID: number, accountEmail: string, password: string) => {
        const hash = await bcrypt.hash(password, 10);

        const account = await Account.create(accountEmail, hash);
        await VerifCode.delete(verifCodeID);
        
        return account;
    },
    login: async (accountEmail: string, password: string) => {
        const account = await Account.find({
            email: accountEmail,
        });
        if (!account) {
            throw new HTTP401Error("Account doesn't exists");
        }
        const isValidPassword = await bcrypt.compare(password, account.password);
        if (!isValidPassword) {
            throw new HTTP401Error("Password not valid");
        }
        return account;
    },
};

export default accountService;