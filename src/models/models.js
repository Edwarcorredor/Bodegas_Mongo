import { z } from 'zod';

const bodegasSchema = z.object({
    id: z.number().int().positive(),
    nombre: z.string().min(3).max(255),
    id_responsable: z.number().int().positive(),
    estado: z.number().int().positive(),
    created_by: z.number().int().positive(),
    update_by: z.number().int().positive(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    deleted_at: z.coerce.date()
});


const productoSchema = z.object({
    id: z.number().int().positive(),
    nombre: z.string().min(3).max(255),
    descripcion: z.string().min(3).max(255),
    estado: z.number().int().positive(),
    created_by: z.number().int().positive(),
    update_by: z.number().int().positive(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().optional()
});


const inventarioSchema = z.object({
    id_bodega: z.number().int().positive(),
    id_producto: z.number().int().positive(),
    cantidad: z.number().int().positive(),
})


const historialSchema = z.object({
    id: z.number().int().positive(),
    cantidad: z.number().int().positive(),
    id_bodega_origen: z.number().int().positive(),
    id_bodega_destino: z.number().int().positive(),
    id_inventario: z.number().int().positive(),
    created_by: z.number().int().positive(),
    update_by: z.number().int().positive(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().optional()
})

const trasladoSchema = z.object({
    id: z.number().int().positive(),
    id_bodega_origen: z.number().int().positive(),
    id_bodega_destino: z.number().int().positive(),
    id_producto: z.number().int().positive(),
    update_by: z.number().int().positive(),
    cantidad: z.number().int().positive(), 
    id_inventario: z.number().int().positive(), 
})

export {
    bodegasSchema,
    productoSchema,
    inventarioSchema,
    historialSchema,
    trasladoSchema
}