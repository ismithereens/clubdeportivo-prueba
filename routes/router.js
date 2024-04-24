import express from "express";
const router = express.Router();
import path from "path";
const __dirname = import.meta.dirname;
import fs from "fs";
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});
router.get("/deportes", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/data/data.json"));
});
router.get("/agregar", (req, res) => {
  const { nombre, precio } = req.query;
  const leerArchivo = fs.readFileSync("./assets/data/data.json");
  const { deportes } = JSON.parse(leerArchivo);
  deportes.push({ nombre, precio });
  fs.writeFileSync("./assets/data/data.json", JSON.stringify({ deportes }));
  res.send("deporte agregado");
});
router.get("/editar", (req, res) => {
  const { nombre, precio } = req.query;
  const leerArchivo = fs.readFileSync("./assets/data/data.json");
  let { deportes } = JSON.parse(leerArchivo);
  deportes.forEach((deporte) => {
    if (deporte.nombre === nombre) {
      deporte.precio = precio;
    }
  });
  fs.writeFileSync("./assets/data/data.json", JSON.stringify({ deportes }));
  res.send(`Precio del deporte ${nombre} actualizado.`);
});
router.get("/eliminar", (req, res) => {
  const { nombre } = req.query;
  const leerArchivo = fs.readFileSync("./assets/data/data.json");
  let { deportes } = JSON.parse(leerArchivo);
  deportes = deportes.filter((deporte) => deporte.nombre !== nombre);
  fs.writeFileSync("./assets/data/data.json", JSON.stringify({ deportes }));
  res.send(`${nombre} eliminado correctamente.`);
});
export default router;
