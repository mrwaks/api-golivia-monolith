"use strict";

// Types
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../types";

// Services
import adminService from "../services/admin.service";

const adminController = {
    getAccount: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountId = +req.params.accountId;

            const account = await adminService.getAccount(accountId);

            return res
                .status(HttpStatus.OK)
                .json({
                    status: HttpStatus.OK,
                    message: account ? "Account Found" : "Account doesn't exists",
                    data: account,
                });
        } catch (error) {
            next(error);
        }
    },
    getAccounts: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accounts = await adminService.getAccounts();

            return res
                .status(HttpStatus.OK)
                .json({
                    status: HttpStatus.OK,
                    message: accounts.length > 0 ? "Accounts Found" : "No accounts currently",
                    data: accounts,
                });
        } catch (error) {
            next(error);
        }
    },
    deleteAccount: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountId = +req.params.accountId;
        
            await adminService.deleteAccount(accountId);
    
            return res
                .status(HttpStatus.OK)
                .json({
                    status: HttpStatus.OK,
                    message: `Account id: '${accountId}' has been deleted`,
                });
        } catch (error) {
            next(error);
        }
    },
};

export default adminController;