import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import auth from "./middleware/auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(logger);        // custom logger
app.use(auth);          // API key middleware

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorHandler);  // global error handler

app.listen(3000, () => console.log("Server running on port 3000"));
