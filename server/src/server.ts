"use strict";

// Core Modules
import { createServer } from "http";

// Types
import { SystemError } from "./types";

// Application
import app from "./app";

const httpPort = "3000";

const normalizePort = (val: string) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || httpPort);
app.set("port", port);

const errorHandler = (error: SystemError) => {
    if (error.syscall !== "listen") {
        throw error;
    }

    const address = server.address();
    const bind = typeof address === "string" ? `pipe: ${address}` : `port: ${port}`;

    switch (error.code) {
        case "EACCESS":
            console.log(`${bind} requires elevated privileges`);
            break;
        case "EADDRINUSE":
            console.log(`${bind} is already in use`);
            break;
        default:
            throw error;
            break;
    }
};

const server = createServer(app);

server.listen(port);

server.on("error", errorHandler);

server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? `pipe: ${address}` : `port: ${port}`;
    console.log(`Server running on ${bind}`);
});

process.on("SIGINT", () => {
    console.log("Server interrupted by 'SIGINT'");
    process.exit(1);
});