"use strict";

// Database
import Account from "../database/dao/Account.db";

// Error Handler
import { HTTP404Error } from "../errorHandler";

const adminService = {
    getAccount: async (accountId: number) => {
        const account = await Account.find({
            id: accountId,
        });
        return account;
    },
    getAccounts: async () => {
        const accounts = await Account.findMany();
        return accounts;
    },
    deleteAccount: async (accountId: number) => {
        const isDeleted = await Account.delete(accountId);
        if (!isDeleted) {
            throw new HTTP404Error("Account Not Found");
        }
        return isDeleted;
    },
};

export default adminService;