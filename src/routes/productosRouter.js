import { Router } from 'express';
import conexion from "../db/atlas.js";
import { productoSchema } from "../models/models.js";
import handlerErrors from '../helpers/errorsSchemas.js';

const productosRouter = Router();
const db = await conexion()

productosRouter

.get("/productos-order-total", async (req, res) => {
    const collection = await db.collection("Producto").aggregate([
        {
            $lookup: {
                from: 'Inventario',
                localField: 'id',
                foreignField: 'id',
                as: 'inventarios'
            }
        },
        {
            $unwind: "$inventarios"
        },
        {
            $project: {
                _id: 0,
                id: 1,
                nombre: 1,
                descripcion: 1,
                total: { $sum: "$inventarios.cantidad" }
            }
        },
        {
            $sort: { total: -1 }
        }
    ]).toArray();
    res.json(collection)
})

.post("/", async (req, res) => {
    const result = productoSchema.safeParse(req.body);
    if(!result.success) return handlerErrors(result, res)
    const collection = await db.collection("Producto").insertOne(result.data);
    await db.collection("Inventario").insertOne({ id_producto: result.data.id, id_bodega: 1, cantidad: 0 });
    res.status(201).json({ Mensaje: "Producto creado", id: collection.insertedId });
})

export default productosRouter;