"use strict";

// Database
import prisma from "../db.config";

// Types
import { Account } from "@prisma/client";

class AccountDB {

    static find = async (props: Partial<Account>) => {
        const account = await prisma.account.findFirst({
            where: props,
        });
        return account;
    };

    static findMany = async () => {
        const accounts = await prisma.account.findMany();
        return accounts;
    };

    static create = async (email: string, hash: string) => {
        const account = await prisma.account.create({
            data: {
                email: email,
                emailVerify: true,
                password: hash,
                createdAt: Date.now().toString(),
            },
        });
        return account;
    };

    static update = async (accountId: number, updatedData: Partial<Account>) => {
        const updatedAccount = await prisma.account.update({
            where: {
                id: accountId,
            },
            data: updatedData,
        });
        return updatedAccount;
    };

    static delete = async (accountId: number) => {
        let isDeleted = false;

        const account  = await prisma.account.findUnique({
            where: {
                id: accountId,
            },
        });

        if (account) {
            await prisma.account.delete({
                where: {
                    id: accountId,
                },
            });
            isDeleted = true;
        }
        
        return isDeleted;
    };

}

export default AccountDB;