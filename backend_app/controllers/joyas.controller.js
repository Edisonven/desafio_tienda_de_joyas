import { joyasModel } from "../models/joyas.model.js";

const read = async (req, res) => {
  const { limit = 5, order_by = "id_ASC", page = 1 } = req.query;
  const validPage = /^[1-9]\d*$/.test(page);

  if (!validPage) {
    return res.status(400).json({ message: "número de página no válido" });
  }
  try {
    const joyas = await joyasModel.findAll({ limit, order_by, page });
    res.json(joyas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const readWithFilter = async (req, res) => {
  try {
    const queryString = req.query;
    const joyas = await joyasModel.findWithFilter(queryString);
    res.json(joyas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const joyasController = { read, readWithFilter };
