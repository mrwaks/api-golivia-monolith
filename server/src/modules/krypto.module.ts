"use strict";

// Npm Modules
import crypto from "crypto";

class Krypto {
    algorithm: string;
    key: Buffer;
    constructor(encryptionKey: string) {
        this.algorithm = "aes-192-cbc";
        this.key = crypto.scryptSync(encryptionKey, "salt", 24);
    }

    encrypt(payload: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (typeof payload !== "string") {
                return reject(new TypeError("The payload must be of type string"));
            }
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
            const encrypted = cipher.update(payload, "utf8", "hex");
            return resolve([
                encrypted + cipher.final("hex"),
                Buffer.from(iv).toString("hex"),
            ].join("|"));
        });
    }

    decrypt(encryptedData: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const [encrypted, iv] = encryptedData.split("|");
            if (!iv) {
                return reject(new Error("Initialization vector not found"));
            }
            if (iv.length < 32) {
                return reject(new Error("Initialization vecotr invalid"));
            }
            const decipher = crypto.createDecipheriv(
                this.algorithm,
                this.key,
                Buffer.from(iv, "hex")
            );
            return resolve(decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8"));
        });
    }
}

export default Krypto;