"use strict";

// Npm Modules
import * as session from "express-session";
import MySQLStore from "express-mysql-session";
import mysql from "mysql";

const mysSqlStore = MySQLStore(session);

const storeOptions = {
    connectionLimit: 10,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Azertyytreza66",
    database: "golivia",
    createDatabaseTable: true,
};

const pool = mysql.createPool(storeOptions);

export const sessionStore = new mysSqlStore(storeOptions, pool);

const sessionOptions: session.SessionOptions = {
    name: "_sid",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: "ed65ce89095cceeed4084bba2cef72c8f03ff64d8d3bbac36fa912de3718cd7f8f85aa3cbb36ae47fe0e6be23617f9f17a58db7cf30bb07b38ea1f158189b502",
    cookie: {
        httpOnly: true,
        maxAge: (1000 * 60 * 60 * 2),
        sameSite: true,
        secure: process.env.NODE_ENV === "production",
    },
};

export const configSession = () => {
    return session.default(sessionOptions);
};