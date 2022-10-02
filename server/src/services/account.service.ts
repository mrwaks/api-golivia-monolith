"use strict";

// Npm Modules
import bcrypt from "bcrypt";

// Database
import accountDB from "../database/dao/account.db";
import verifCodeDB from "../database/dao/verifCode.db";

const accountService = {
    signupStep2: async (verifCodeID: number, accountEmail: string, password: string) => {
        const hash = await bcrypt.hash(password, 10);

        const account = await accountDB.createAccount(accountEmail, hash);
        await verifCodeDB.deleteCode(verifCodeID);
        
        return account;
    },
};

export default accountService;