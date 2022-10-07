"use strict";

// Types
import { Application } from "express";
import { Routes } from "../../types";

// Middlewares
import auth from "../../middlewares/auth.middleware";

const configAuth = (app: Application, routes: Routes[]) => {
    routes.forEach(route => {
        if (route.method === "GET") {
            if (route.auth === "ADMIN") {
                return app.get(route.url, auth.admin);
            }
            if (route.auth === 'USER') {
                return app.get(route.url, auth.user);
            }
        }
        if (route.method === "POST") {
            if (route.auth === "ADMIN") {
                return app.post(route.url, auth.admin);
            }
            if (route.auth === 'USER') {
                return app.post(route.url, auth.user);
            }
        }
        if (route.method === "PUT") {
            if (route.auth === "ADMIN") {
                return app.put(route.url, auth.admin);
            }
            if (route.auth === 'USER') {
                return app.put(route.url, auth.user);
            }
        }
        if (route.method === "DELETE") {
            if (route.auth === "ADMIN") {
                return app.delete(route.url, auth.admin);
            }
            if (route.auth === 'USER') {
                return app.delete(route.url, auth.user);
            }
        }
    });
};

export default configAuth;