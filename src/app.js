import express from "express";
import dotenv from "dotenv";
import bodegasRouter from "./routes/bodegasRouter.js";
import productosRouter from "./routes/productosRouter.js";
import inventariosRouter from "./routes/inventariosRouter.js";
import trasladosRouter from "./routes/trasladosRouter.js";

import { crearToken, validarToken } from "./middlewares/middlewareJWT.js";

dotenv.config();

const app = express();

app.use(express.json())
    .use("/token", crearToken)
    .use("/bodegas", validarToken, bodegasRouter)
    .use("/productos", validarToken, productosRouter)
    .use("/inventarios", validarToken, inventariosRouter)
    .use("/traslados", validarToken, trasladosRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`);
});