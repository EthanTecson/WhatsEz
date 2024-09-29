/*!
 * WhatsEz server connection
 * Copyright(c) 2024 Ethan Tecson
 * This file implements the connection to our server
 */

import express from "express";
import cors from "cors";
import controller from "./routes/controller.js";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 5050; 
const app = express();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "client" directory
app.use(express.static(path.join(__dirname, "../client")));

app.use(cors());
app.use(express.json());
app.use("/api", controller);

// Front end
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"../client/index.html"));
})

// For starting the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});