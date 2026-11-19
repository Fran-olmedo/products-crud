
import { NextResponse } from "next/server";
import pool from "@/lib/db";


export async function GET() {

    const [Productos] = await pool.query('SELECT * FROM productos') as any
    
    
    return NextResponse.json(Productos)
}

export async function POST(req: Request) {
    try {
        // 1. Extraer los datos correctamente usando await req.json()
        const { codigo, nombre, precio } = await req.json();

        // 2. Ejecutar la consulta pasando los parámetros como un array en el segundo argumento
        const [result] = await pool.query(
            'INSERT INTO productos (codigo, nombre, precio) VALUES (?, ?, ?)',
            [codigo, nombre, precio]
        );

        // 3. Devolver una respuesta exitosa
        return NextResponse.json(
            { message: 'Producto creado con éxito', id: result.insertId },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error al crear el producto:', error);
        return NextResponse.json(
            { error: 'Hubo un error al procesar la petición' },
            { status: 500 }
        );
    }
}