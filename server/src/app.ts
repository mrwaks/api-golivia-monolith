"use strict";

// Npm Modules
import express from "express";
import morgan from "morgan";

// Middlewares
import noXss from "./middlewares/no-xss.middleware";

// Config
import configRoutes from "./config/routes.config";

// Routes
import routes from "./routes";

// Error Handler
import { errorHandler } from "./errorHandler";

const app = express();

app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(noXss)
    .use(morgan("dev"));

configRoutes(app, routes);

app
    .use(errorHandler.returnError)
    .use(errorHandler.get404);

process.on("uncaughtException", (err) => {
    console.log(`Caught exception: ${err}`);
});

export default app;