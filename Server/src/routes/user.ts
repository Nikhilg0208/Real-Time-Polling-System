import express from "express";
import { newUser } from "../controllers/user.js";

const userRoute = express.Router();

userRoute.post("/new", newUser);

export default userRoute;
