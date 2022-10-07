"use strict";

// Custom Modules
import fString from "../modules/fString.module";

// Types
import { Kind } from "@prisma/client";
import { PayloadVerificationCode } from "../types";

// Database
import VerifCode from "../database/dao/VerifCode.db";

// Error Handler
import { HTTP400Error } from "../errorHandler";

// Events
import emailEvent from "../events/email.event";

// Config
import config from "../config";
import crypto from "../config/crypto.config";

const verifCodeService = {
    /**
     * Send a verification code to validate the first registration step.
     */
    sendCode: async (kind: Kind, payload: PayloadVerificationCode): Promise<void> => {
        const isCodeExists = await VerifCode.find({
            kind: kind,
            payload: JSON.stringify(payload),
        });
        if (isCodeExists) {
            throw new HTTP400Error(fString(config.messages.http._400.alreadySent, { element: "Verification Code" }));
        }

        const verifCode = await VerifCode.create(kind, JSON.stringify(payload));

        emailEvent.emit("send", {
            from: "Golivia <confirm@golivia.io>",
            subject: "Golivia code email verification",
            to: payload.accountEmail,
            text: `Here's your verification code: ${verifCode.code}`,
        });
    },
    /**
     * After checking the validity of the verification code sent by email.
     * 
     * Send a payload to the client, for the second registration step.
     */
    sendClientPayload: async (verifCode: string) => {
        const code = await VerifCode.find({
            code: verifCode,
        });

        const payload = {
            key: await crypto.encrypt(code.code),
            timestamp: code.createdAt,
        };

        return payload;
    },
};

export default verifCodeService;