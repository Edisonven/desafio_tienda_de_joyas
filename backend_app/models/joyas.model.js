import { pool } from "../database/connection.js";
import format from "pg-format";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DOMAIN_URL_APP
    : `http://localhost::${process.env.PORT}`;

const findAll = async ({ limit = 5, order_by = "id_ASC", page = 1 }) => {
  let query = "";

  if (order_by) {
    const [campo, orden] = order_by.split("_");
    query += ` ORDER BY ${campo} ${orden}`;
  }
  if (limit) {
    query += ` LIMIT ${limit}`;
  }
  if (page && limit) {
    const offset = (page - 1) * limit;
    query += ` OFFSET ${offset}`;
  }

  const consulta = `SELECT * FROM inventario ${query};`;
  const { rows: joyas } = await pool.query(consulta);

  const results = joyas.map((joya) => {
    return {
      name: joya.nombre,
      href: `/joyas/joya/${joya.id}`,
    };
  });

  const totalJoyas = joyas.length;
  const totalStock = joyas.reduce(
    (acumulador, valorActual) => acumulador + valorActual.stock,
    0
  );
  const HATEOAS = {results, totalJoyas, totalStock};
  return HATEOAS;
};

export const joyasModel = { findAll };
