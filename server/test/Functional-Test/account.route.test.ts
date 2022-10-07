"use strict";

// Npm Modules
import request from "supertest";

// Config
import mailosaur from "./config/mailosaur.config";
import config from "./config/config";

const baseUrl = config.baseUrl;

describe("Golivia Account Routes Test", () => {

    it("#Test - Signup Step 1", async () => {
        await request(baseUrl)
        .post("/account/signup/step1")
        .send({ 
            accountEmail: config.data.accountEmail,
        })
        .expect(200);
    });


    it("#Process(Mailosaur) - Get Verification Code From Email", async () => {
        const emailWithVerificationCode = await mailosaur.messages.get(config.mailosaur.serverId, { subject: "Golivia code email verification" });
        const verifCode = emailWithVerificationCode.text.codes[0].value;

        process.env.EMAIL_VERIF_CODE_ID = emailWithVerificationCode.id;
        process.env.VERIF_CODE = verifCode;
    });

    it ("#Test - Verification Code", async () => {
        const response = await request(baseUrl)
            .post("/account/verification-code")
            .send({ 
                verifCode: process.env.VERIF_CODE,
            })
            .expect(200);

        const keyGenerated = response.body.data.key;
        process.env.KEY = keyGenerated;
    });

    it("#Process(Mailosaur) - Deleted Email Verification Code", async () => {
        await mailosaur.messages.del(process.env.EMAIL_VERIF_CODE_ID);
    });

    it("#Test - Signup Step 2", async () => {
        const key = process.env.KEY;
        const password1 = "Password66€";
        const password2 = "Password66€";

        const account = await request(baseUrl)
            .post("/account/signup/step2")
            .send({ key, password1, password2 })
            .expect(201);

        const accountId = account.body.data.accountId;
        process.env.ACCOUNT_ID = accountId;
        process.env.ACCOUNT_PASSWORD = password1;
    });

    it("#Test - Login", async () => {
        const response = await request(baseUrl)
            .post("/account/login")
            .send({
                accountEmail: config.data.accountEmail,
                password: process.env.ACCOUNT_PASSWORD,
            })
            .expect(200);

            // Test if "_sid" cookie exists
            const cookies = response.header["set-cookie"];
            if (!cookies) {
                throw new Error("No Set-Cookie Header");
            }
            cookies.forEach((cookie: string) => {
                if (!/^_sid/.test(cookie)) {
                    throw new Error("Not '_sid' Cookie");
                } else {
                    process.env.COOKIE_SESSION_ID = cookie;
                }
            });
    });

    it ("#Test - Account Authentified", async () => {
        const response = await request(baseUrl)
            .get("/account/authentified")
            .set("Cookie", process.env.COOKIE_SESSION_ID)
            .expect(200);
    });

    it ("#Test - Logout", async () => {
        await request(baseUrl)
            .get("/account/logout")
            .set("Cookie", process.env.COOKIE_SESSION_ID)
            .expect(200);
    });

    it("#Test - Delete Account", async () => {
        const accountId = process.env.ACCOUNT_ID;
        await request(baseUrl)
            .delete(`/admin/delete-account/${accountId}`)
            .set("Authorization", config.admin.key)
            .expect(200);
    });
});