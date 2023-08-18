import { Router } from 'express';
import conexion from "../db/atlas.js";
import handlerErrors from "../helpers/errorsSchemas.js";
import { trasladoSchema } from "../models/models.js";

const db = await conexion();
const trasladosRouter = Router();


trasladosRouter.post("/", async (req, res) => {
    try {
        const result = trasladoSchema.safeParse(req.body);
        if(!result.success) return handlerErrors(result, res);
        let resultDB = await db.collection("Inventario").findOne({ id_bodega: result.data.id_bodega_origen, id_producto: result.data.id_producto });
        if (!resultDB) return res.status(400).json({ message: "No existe el producto en la bodega origen" });
        if (resultDB.cantidad < result.data.cantidad) return res.status(400).json({ message: "No hay suficientes unidades en la bodega origen" });
        await db.collection("Inventario").updateOne({ id_bodega: result.data.id_bodega_origen, id_producto: result.data.id_producto }, { $inc: { cantidad: -result.data.cantidad } });
        await db.collection("Inventario").updateOne({ id_bodega: result.data.id_bodega_destino, id_producto: result.data.id_producto }, { $inc: { cantidad: result.data.cantidad } });
        await db.collection("Historial").insertOne({
            id: result.data.id,
            id_bodega_origen: result.data.id_bodega_origen,
            id_bodega_destino: result.data.id_bodega_destino,
            id_producto: result.data.id_producto,
            cantidad: result.data.cantidad,
            created_by: result.data.created_by,
            update_by: result.data.update_by,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
            id_inventario: result.data.id,
        });
        res.status(201).json({ message: "Traslado creado" });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error del servidor" });
    }
})


export default trasladosRouter;