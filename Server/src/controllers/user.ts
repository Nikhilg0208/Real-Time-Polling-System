import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { prisma } from "../prisma/index.js";
import { ResponseType, NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { genderType } from "@prisma/client";

export const newUser = TryCatch<ResponseType>(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response<ResponseType>,
    next: NextFunction
  ) => {
    const { name, email, photo, gender, _id, dob } = req.body;

    if (!_id || !name || !email || !photo || !gender || !dob)
      return next(new ErrorHandler("Please add all fields", 400));

    const normalizedGender = gender.toUpperCase() as genderType;

    if (
      normalizedGender !== genderType.MALE &&
      normalizedGender !== genderType.FEMALE
    ) {
      return next(new ErrorHandler("Invalid gender value", 400));
    }

    let user = await prisma.user.findUnique({
      where: {
        id: _id,
      },
    });

    if (user)
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user.name}`,
      });

    user = await prisma.user.create({
      data: {
        id: _id,
        name,
        email,
        photoUrl: photo,
        gender: normalizedGender,
        dob: new Date(dob),
      },
    });

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.name}`,
    });
  }
);
