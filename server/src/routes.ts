"use strict";

// Routes
import accountRoutes from "./routes/account.routes";
import adminRoutes from "./routes/admin.routes";
import clientRoutes from "./routes/client.routes";
import secureRoutes from "./routes/secure.routes";

// Types
import { Routes } from "./types";

const routes: Routes[] = [
    secureRoutes,
    ...clientRoutes,
    ...accountRoutes,
    ...adminRoutes,
];

export default routes;