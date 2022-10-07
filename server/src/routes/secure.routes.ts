"use strict";

// Types
import { Account, Role } from "@prisma/client";
import { HttpStatus, Routes } from "../types";

const baseUrl = "/api/v1";

const secureRoutes: Routes = {
    url: baseUrl + "/account/authentified",
    method: "GET",
    auth: "USER",
    controller: async (req, res, next) => {
        try {
            const accountId: Account = req.session.accountId;
            const role: Role = req.session.role;
            return res
                .status(HttpStatus.OK)
                .json({
                    status: HttpStatus.OK,
                    accountId: accountId,
                    role: role,
                    message: `Account Authentified`,
                });
        } catch (error) {
            next(error);
        }
    },
};

export default secureRoutes;