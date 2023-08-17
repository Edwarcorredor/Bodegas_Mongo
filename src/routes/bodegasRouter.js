import { Router } from "express";
import conexion from "../db/atlas.js";
import { bodegasSchema } from "../models/models.js";
import handlerErrors from "../helpers/errorsSchemas.js";

const bodegasRouter = Router();
const db = await conexion();

bodegasRouter
    
    .get("/", async (req, res) => {
        const collection = await db
            .collection("Bodega")
            .find()
            .sort({ nombre: 1 })
            .toArray();
        res.status(200).json(collection);
    })
    
    .post("/", async (req, res) => {
        const result = bodegasSchema.safeParse(req.body);
        if (!result.success) return handlerErrors(result, res)
        const collection = await db.collection("Bodega").insertOne(result.data);
        res.status(201).json({ Mensaje: "Bodega creada", id: collection.insertedId });
    });

export default bodegasRouter;