"use strict";

// Npm Modules
import { SendMailOptions } from "nodemailer";

// Core Modules
import { EventEmitter } from "events";

// Config
import transport from "../config/nodemailer.config";

// Error Handler
import { HTTP500Error } from "../errorHandler";

const emailEvent = new EventEmitter();

emailEvent.on("send", async (mailOptions: SendMailOptions) => {
    const emailSent = await transport.sendMail(mailOptions);
    if (!emailSent.accepted) {
        throw new HTTP500Error();
    }
});

export default emailEvent;