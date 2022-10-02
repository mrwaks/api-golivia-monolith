"use strict";

// Database
import accountDB from "../database/dao/account.db";

// Error Handler
import { HTTP404Error } from "../errorHandler";

const adminService = {
    getAccount: async (accountId: number) => {
        const account = await accountDB.findAccount({
            id: accountId,
        });
        return account;
    },
    getAccounts: async () => {
        const accounts = await accountDB.findAccounts();
        return accounts;
    },
    deleteAccount: async (accountId: number) => {
        const isDeleted = await accountDB.deleteAccount(accountId);
        if (!isDeleted) {
            throw new HTTP404Error("Account Not Found");
        }
        return isDeleted;
    },
};

export default adminService;