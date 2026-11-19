import { NextResponse } from "next/server";
import pool from "@/lib/db";


export async function GET(Req:Request, {params}:any) {

    const {id} = await params

    const [Productos] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]) as any
    
    const producto = Productos[0]
    
    return Response.json(producto);
}

export async function DELETE(req:Request, {params}: any) {

    const {id} = await params

    

    try{
        const [result] = await pool.query('DELETE FROM productos where id=?', [id])
        
        

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: 'Producto no encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { mensaje: 'Producto borrado correctamente'},
            {status : 200}
            
        );

    }
    

    catch (error) {
        console.error('Error al eliminar el producto:', error);
        return NextResponse.json(
            { error: 'Hubo un error al procesar la petición' },
            { status: 500 }
        );

}
}

export async function PUT(req:Request, {params}: any) {
    const {id} = await params
    try{
        const { codigo, nombre, precio } = await req.json();
        const [result] = await pool.query(
            'UPDATE productos SET codigo=?, nombre=?, precio=? WHERE id=?',
            [codigo, nombre, precio, id]
        );
        return NextResponse.json(
            { message: 'Producto actualizado con éxito'},
            { status: 201 }
        );
    }
    catch (error) {
        console.error('Error al modificar el producto:', error);
        return NextResponse.json(
            { error: 'Hubo un error al procesar la petición' },
            { status: 500 }
        );
    }
}
