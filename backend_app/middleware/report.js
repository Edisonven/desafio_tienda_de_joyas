const report = (req, res, next) => {
  const url = req.url;
  const queries = req.query;
  console.log(
    `consulta recibida a la ruta : ${url} con la siguiente query :`,
    queries
  );
  next();
};

export default report;
