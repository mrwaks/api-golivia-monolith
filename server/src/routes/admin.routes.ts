"use strict";

// Types
import { Routes } from "../types";

// Config
import config from "../config";

// Controllers
import adminController from "../controllers/admin.controller";

// Filters
import adminFilters from "../filters/admin.filters";

const baseUrl = `/api/${config.apiVersion}`;

const adminRoutes: Routes[] = [
    {
        url: baseUrl + "/admin/delete-account/:accountId",
        method: "DELETE",
        controller: adminController.deleteAccount,
        filters: [
            adminFilters.isAdminKeyValid,
        ],
    },
    {
        url: baseUrl + "/admin/accounts/:accountId",
        method: "GET",
        controller: adminController.getAccount,
        filters: [
            adminFilters.isAdminKeyValid,
        ],
    },
    {
        url: baseUrl + "/admin/accounts",
        method: "GET",
        controller: adminController.getAccounts,
        filters: [
            adminFilters.isAdminKeyValid,
        ],
    },
];

export default adminRoutes;