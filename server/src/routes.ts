"use strict";

// Routes
import accountRoutes from "./routes/account.routes";
import adminRoutes from "./routes/admin.routes";

// Types
import { Routes } from "./types";

const routes: Routes[] = [
    ...accountRoutes,
    ...adminRoutes,
];

export default routes;