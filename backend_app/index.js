import express from "express";
import "dotenv/config";
import joyasRoutes from "./routes/joyas.routes.js";

const app = express();

app.use("/joyas", joyasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
