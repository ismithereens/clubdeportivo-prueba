import express from "express";
const app = express();
const port = process.env.port || 3000;
import router from "./routes/router.js";
app.use("/", router);
app.listen(port, () =>
  console.log(`Servidor iniciado en el puerto http://localhost:${port}`)
);

