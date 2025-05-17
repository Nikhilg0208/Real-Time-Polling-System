import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.js";

import cors from "cors";

// Importing Routes
import userRoute from "./routes/user.js";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;

const clientURL = process.env.CLIENT_URL || "";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: [clientURL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

// Using Routes
app.use("/api/v1/user", userRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Express is working on http://localhost:${port}`);
});
