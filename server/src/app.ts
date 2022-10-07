"use strict";

// Npm Modules
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

// Middlewares
import noXss from "./middlewares/no-xss.middleware";

// Config
import configFilters from "./config/config-routes/filters.config";
import configController from "./config/config-routes/controllers.config";
import configAuth from "./config/config-routes/auth.config";
import { configSession } from "./config/session.config";

// Routes
import routes from "./routes";

// Error Handler
import { errorHandler } from "./errorHandler";

const app = express();

app.disable("x-powered-by");

app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(helmet())
    .use(cors())
    .use(cookieParser())
    .use(noXss)
    .use(configSession())
    .use(morgan("dev"));

configAuth(app, routes);
configFilters(app, routes);
configController(app, routes);

app
    .use(errorHandler.returnError)
    .use(errorHandler.get404);

process.on("uncaughtException", (err) => {
    console.log(`Caught exception: ${err}`);
});

export default app;