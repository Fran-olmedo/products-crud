'use server'

import pool from "@/lib/db"
import { revalidatePath } from "next/cache"
// @ts-ignore
import { redirect } from "next/navigation"


export type EstadoProducto = {
    exito:boolean,
    mensaje: string

}

function verificarDatos(formdata: FormData) {
    const codigo = formdata.get('codigo')?.toString().trim();
    const nombre = formdata.get('nombre')?.toString().trim();
    const precioTexto = formdata.get('precio')?.toString().trim();
    const precio = Number(precioTexto);

    if(!codigo) return{ error:'El codigo es obligatorio'}
    if(!nombre) return{ error:'El nombre es obligatorio'}
    if(!precioTexto) return{ error:'El precio es obligatorio'}
    if(Number.isNaN(precio)) return{ error:'El precio debe ser un numero valido'}
    if(precio<=0) return{ error:'El precio debe ser mayor a 0'}

    return{
        error:null,
        codigo,
        nombre,
        precio
    }
}

export async function crearproducto(estadoAnterior:EstadoProducto, formdata: FormData):Promise<EstadoProducto> {
    
    let verificacion = verificarDatos(formdata)
    
    if (verificacion.error) {
        return{
            exito: false,
            mensaje: verificacion.error
        }
    }

    try {
        await pool.query(
            "INSERT INTO productos (codigo, nombre, precio) VALUES (?, ?, ?)",
            [verificacion.codigo, verificacion.nombre, verificacion.precio]
        )
        revalidatePath('/productos')
        return {
            exito: true,
            mensaje: 'Producto creado correctamente'
        }
    }
    catch (error) {
        return{
            exito:false,
            mensaje: 'No se pudo crear el producto'
        }
    }
}

export async function editarProducto(id: String, formdata: FormData) {
    const codigo = formdata.get('codigo') as string
    const nombre = formdata.get('nombre') as string
    const precio = Number(formdata.get('precio'))

    await pool.query(
        "UPDATE productos SET codigo = ?, nombre = ?, precio = ? WHERE id = ?",
        [codigo, nombre, precio, id]
    )

    revalidatePath("/productos")
    redirect("/productos")
}

export async function borrarProducto(id: string) {

    await pool.query(
        "DELETE FROM productos WHERE id=?", [id]
    )

    revalidatePath("/productos")
    redirect("/productos")

}








