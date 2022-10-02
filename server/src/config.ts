"use strict";

// Npm Modules
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const config = {
    apiVersion: "v1",
    messages: {
        http: {
            _200: {
                sent: "${element} sent",
                valid: "${element} valid",
                created: "${element} created",
            },
            _400: {
                missing: "Missing ${element}",
                invalid: "Invalid ${element}",
                invalidPassword: "Password requires at least: one uppercase letter, one lowercase letter, one number, one special character and at least 10 characters",
                notAllowed: "${element} Not Allowed",
                alreadySent: "${element} Already Sent",
            },
            _404: {
                notFound: "${element} Not Found",
            },
            _409: {
                alreadyExists: "${element} Already Exists",
                notExits: "${element} Doesn't Exists",
            },
            _500: {
                internServErr: "Internal Server Error",
            },
        },
    },
    environmentVariables: {
        nodemailer: {
            username: process.env.MAILOSAUR_USERNAME,
            password: process.env.MAILOSAUR_PASSWORD,
        },
        crypto: {
            key: process.env.CRYPTO_KEY,
        },
        admin: {
            key: process.env.ADMIN_KEY,
        },
    },
};

export default config;