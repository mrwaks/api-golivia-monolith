"use strict";

// Npm Modules
import nodemailer from "nodemailer";

// Config
import config from "../config";

/** Nodemailer Transporter. */
const transport = nodemailer.createTransport({
    host: "smtp.mailosaur.net",
    port: 2525,
    auth: {
        type: "Login",
        user: config.environmentVariables.nodemailer.username,
        pass: config.environmentVariables.nodemailer.password,
    },
});

export default transport;