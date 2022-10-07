"use strict";

// Types
import { Application } from "express";
import { Routes } from "../../types";

const configController = (app: Application, routes: Routes[]) => {
    routes.forEach(route => {
        if (route.method === "GET") {
            return app.get(route.url, route.controller);
        }
        if (route.method === "POST") {
            return app.post(route.url, route.controller);
        }
        if (route.method === "PUT") {
            return app.put(route.url, route.controller);
        }
        if (route.method === "DELETE") {
            return app.delete(route.url, route.controller);
        }
    })
};

export default configController;