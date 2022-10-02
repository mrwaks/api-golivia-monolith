"use strict";

// Database
import prisma from "../db.config";

// Types
import { Kind, VerificationCode } from "@prisma/client";

const verifCodeDB = {
    findFirstCode: async (props: Partial<VerificationCode>) => {
        const verifCode = await prisma.verificationCode.findFirst({
            where: props,
        });
        return verifCode;
    },
    createCode: async (kind: Kind, payload: string): Promise<VerificationCode> => {
        const min = 100000;
        const max = 999999;
        const randomNumber = (Math.floor(Math.random() * (max - min + 1)) + min).toString();

        const isCodeExists = await verifCodeDB.findFirstCode({
            code: randomNumber,
        });

        const code = isCodeExists ? await verifCodeDB.createCode(kind, payload) : randomNumber;

        const verifCode = await prisma.verificationCode.create({
            data: {
                code: code as string,
                kind: kind,
                payload: payload,
                createdAt: Date.now().toString(),
            },
        });

        return verifCode;
    },
    deleteCode: async (id: number) => {
        await prisma.verificationCode.delete({
            where: {
                id: id,
            },
        });
    },
};

export default verifCodeDB;