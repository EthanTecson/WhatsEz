/*!
 * WhatsEz server connection
 * Copyright(c) 2024 Ethan Tecson
 * This file implements the connection to our server
 */

import express from "express";
import cors from "cors";
import controller from "./routes/controller.js"

const PORT = process.env.PORT || 5050; 
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", controller);

// For starting the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});