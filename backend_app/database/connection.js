import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";

export const pool = new Pool({
  allowExitOnIdle: true,
});

try {
  await pool.query("SELECT NOW()");
  console.log("Conectado a la base de datos");
} catch (error) {
  console.log(error);
}
