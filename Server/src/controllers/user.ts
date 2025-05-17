import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { prisma } from "../prisma/index.js";
import { ResponseType, SaveDetailsRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";

export const SaveDetails = TryCatch<ResponseType>(
  async (
    req: Request<{}, {}, SaveDetailsRequestBody>,
    res: Response<ResponseType>,
    next: NextFunction
  ) => {
    const { email, name } = req.body;

    if (!email) return next(new ErrorHandler("All Fields are required", 400));

    await prisma.user.create({
      data: {
        userName: "nike",
        email,
        name,
      },
    });
    return res.status(201).json({
      success: true,
      message: `Welcome, ${name}`,
    });
  }
);
