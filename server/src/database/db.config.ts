"use strict";

// Npm Modules
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["info", "query", "warn", "error"],
    errorFormat: "pretty",
});

export default prisma;