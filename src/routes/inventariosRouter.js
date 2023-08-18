import { Router } from 'express';
import conexion from "../db/atlas.js";
import { inventarioSchema } from "../models/models.js";
import handlerErrors from "../helpers/errorsSchemas.js";

const inventariosRouter = Router();
const db = await conexion();
inventariosRouter.post("/", async (req, res) => {
    const result = inventarioSchema.safeParse(req.body);
    if(!result.success) return handlerErrors(result, res)
    const collection = await db.collection("inventarios").findOne({ id_producto: result.data.id_producto, id_bodega: result.data.id_bodega });
    if (collection) {
        await db.collection("inventarios").updateOne({ id_producto: result.data.id_producto, id_bodega: result.data.id_bodega }, { $inc: { cantidad: result.data.cantidad } });
    }else {
        await db.collection("inventarios").insertOne(result.data);
    }
    res.status(201).json({ message: "Inventario creado" });
});



export default inventariosRouter;