"use strict";

// Config
import config from "../config";

// Controllers
import accountController from "../controllers/account.controller";
import verifCodeController from "../controllers/verifCode.controller";

// Filters
import accountFilters from "../filters/account.filters";
import verifCodeFilters from "../filters/verifCode.filters";

// Types
import { Routes } from "../types";

const baseUrl = `/api/${config.apiVersion}`;

const accountRoutes: Routes[] = [
    {
        url: baseUrl + "/account/signup/step1",
        method: "POST",
        auth: false,
        controller: accountController.signupStep1,
        filters: [
            accountFilters.signupStep1,
        ],
    },
    {
        url: baseUrl + "/account/signup/step2",
        method: "POST",
        auth: false,
        controller: accountController.signupStep2,
        filters: [
            accountFilters.signupStep2,
        ],
    },
    {
        url: baseUrl + "/account/verification-code",
        method: "POST",
        auth: false,
        controller: verifCodeController,
        filters: [
            verifCodeFilters.isValidCode,
        ],
    },
    {
        url: baseUrl + "/account/login",
        method: "POST",
        auth: false,
        controller: accountController.login,
        filters: [
            accountFilters.login,
        ],
    },
    {
        url: baseUrl + "/account/logout",
        method: "GET",
        auth: "USER",
        controller: accountController.logout,
    },
];

export default accountRoutes;