"use strict";

// Core Modules
import { join } from "path";

// Npm Modules
import request from "supertest";
import MailosaurClient from "mailosaur";
import { config } from "dotenv";
config({ path: join(__dirname, "test.env") });

const baseUrl = "http://localhost:3000/api/v1";

const apiKeyMailosaur = "ja9odXPNSuTZmwTD";
const mailausor = new MailosaurClient(apiKeyMailosaur);
const serverIdMailosaur = "pbhgyb8i";

const accountEmail = "test@pbhgyb8i.mailosaur.net";

describe("Resful Golivia API Test", () => {

    it("Signup Step 1", async () => {
        await request(baseUrl)
        .post("/account/signup/step1")
        .send({ accountEmail })
        .expect(200);
    });

    it ("Verification Code", async () => {
        const emailWithVerificationCode = await mailausor.messages.get(serverIdMailosaur, { subject: "Golivia code email verification" });
        const verifCode = emailWithVerificationCode.text.codes[0].value;

        const codeVerification = await request(baseUrl)
        .post("/account/verification-code")
        .send({ verifCode })
        .expect(200);

        const key = codeVerification.body.data.key;
        process.env.KEY = key;

        await mailausor.messages.del(emailWithVerificationCode.id);
    });

    it("Signup Step 2", async () => {
        const key = process.env.KEY;
        const password1 = "Password66€";
        const password2 = "Password66€";

        const account = await request(baseUrl)
            .post("/account/signup/step2")
            .send({ key, password1, password2 })
            .expect(201);

        const accountId = account.body.data.accountId;
        process.env.ACCOUNT_ID = accountId;
    });

    it("Delete Account", async () => {
        const accountId = process.env.ACCOUNT_ID;
        await request(baseUrl)
            .delete(`/admin/delete-account/${accountId}`)
            .set("Authorization", process.env.ADMIN_KEY)
            .expect(200);
    });
});