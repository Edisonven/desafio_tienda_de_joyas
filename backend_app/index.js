import express from "express";
import "dotenv/config";
import joyasRoutes from "./routes/joyas.routes.js";
import report from "./middleware/report.js";

const app = express();

app.use("/joyas", report, joyasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
