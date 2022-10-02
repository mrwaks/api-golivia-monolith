"use strict";

// Types
import { Request, Response } from "express";
import { HttpStatus } from "../types";

const homeController = {
    home: (req: Request, res: Response) => {
        res
            .status(HttpStatus.OK)
            .json({
                status: HttpStatus.OK,
                message: "Home page",
            });
    },
};

export default homeController;