"use strict";

// Types
import { Application } from "express";
import { Routes } from "../types";

const configRoutes = (app: Application, routes: Routes[]) => {
    routes.forEach(route => {
        if (route.method === "GET") {
            if (route.filters) {
                return app.get(route.url, ...route.filters, route.controller);
            }
            return app.get(route.url, route.controller);
        }
        if (route.method === "POST") {
            if (route.filters) {
                return app.post(route.url, ...route.filters, route.controller);
            }
            return app.post(route.url, route.controller);
        }
        if (route.method === "DELETE") {
            if (route.filters) {
                return app.delete(route.url, ...route.filters, route.controller);
            }
            return app.delete(route.url, route.controller);
        }
    })
};

export default configRoutes;