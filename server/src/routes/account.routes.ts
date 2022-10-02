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
        controller: accountController.signupStep1,
        filters: [
            accountFilters.signupStep1,
        ],
    },
    {
        url: baseUrl + "/account/signup/step2",
        method: "POST",
        controller: accountController.signupStep2,
        filters: [
            accountFilters.signupStep2,
        ],
    },
    {
        url: baseUrl + "/account/verification-code",
        method: "POST",
        controller: verifCodeController,
        filters: [
            verifCodeFilters.isValidCode,
        ],
    },
];

export default accountRoutes;