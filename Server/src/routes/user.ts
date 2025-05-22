import express from "express";
import { getUser, newUser } from "../controllers/user.js";

const userRoute = express.Router();

userRoute.post("/new", newUser);

userRoute.get("/:id", getUser);

export default userRoute;
