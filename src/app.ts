import express from "express";
import campaignRoutes from "../src/routes/campaigan.routes";

import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/campaign", campaignRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});