"use strict";

// Database
import prisma from "../db.config";

// Types
import { Kind, VerificationCode } from "@prisma/client";

class VerifCodeDB {

    static find = async (props: Partial<VerificationCode>) => {
        const verifCode = await prisma.verificationCode.findFirst({
            where: props,
        });
        return verifCode;
    };

    static create = async (kind: Kind, payload: string): Promise<VerificationCode> => {
        const min = 100000;
        const max = 999999;
        const randomNumber = (Math.floor(Math.random() * (max - min + 1)) + min).toString();

        const isCodeExists = await VerifCodeDB.find({
            code: randomNumber,
        });

        const code = isCodeExists ? await VerifCodeDB.create(kind, payload) : randomNumber;

        const verifCode = await prisma.verificationCode.create({
            data: {
                code: code as string,
                kind: kind,
                payload: payload,
                createdAt: Date.now().toString(),
            },
        });

        return verifCode;
    };

    static delete = async (id: number) => {
        await prisma.verificationCode.delete({
            where: {
                id: id,
            },
        });
    };

}

export default VerifCodeDB;