"use strict";

// Types
import { Application } from "express";
import { Routes } from "../../types";

const configFilters = (app: Application, routes: Routes[]) => {
    routes.forEach(route => {
        if (route.method === "GET") {
            if (route.filters && route.filters.length > 0) {
                return app.get(route.url, ...route.filters);
            }
        }
        if (route.method === "POST") {
            if (route.filters && route.filters.length > 0) {
                return app.post(route.url, ...route.filters);
            }
        }
        if (route.method === "PUT") {
            if (route.filters && route.filters.length > 0) {
                return app.put(route.url, ...route.filters);
            }
        }
        if (route.method === "DELETE") {
            if (route.filters && route.filters.length > 0) {
                return app.delete(route.url, ...route.filters);
            }
        }
    });
};

export default configFilters;