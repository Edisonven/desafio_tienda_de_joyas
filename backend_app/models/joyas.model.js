import { pool } from "../database/connection.js";
import format from "pg-format";

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
  const HATEOAS = { results, totalJoyas, totalStock };
  return HATEOAS;
};

const findWithFilter = async ({ precio_max, precio_min, categoria, metal }) => {
  let filtros = [];
  const values = [];

  const addFilter = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = filtros;
    filtros.push(`${campo} ${comparador} $${length + 1}`);
  };

  if (precio_max) {
    addFilter("precio", "<=", precio_max);
  }

  if (precio_min) {
    addFilter("precio", ">=", precio_min);
  }

  if (categoria) {
    addFilter("categoria", "=", categoria);
  }

  if (metal) {
    addFilter("metal", "=", metal);
  }

  let query = "SELECT * FROM inventario";
  if (filtros.length > 0) {
    query += ` WHERE ${filtros.join(" AND ")}`;
  }
console.log(query)
  const { rows: joyas } = await pool.query(query, values);
  return joyas;
};

export const joyasModel = { findAll, findWithFilter };
