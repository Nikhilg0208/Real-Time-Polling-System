import express from "express";
import { SaveDetails } from "../controllers/user.js";

const userRoute = express.Router();

userRoute.post("/saveDetails", SaveDetails);

export default userRoute;
