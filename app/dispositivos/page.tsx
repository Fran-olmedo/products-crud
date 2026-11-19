import Link from "next/link"

import styles from "./dispositivos.module.css"
import pool from "@/lib/db"

export const dynamic = "force-dynamic"

export default async function Dispositivos() {
    let rows: any[] = []

    try {
        const [resultado] = (await pool.query("SELECT * FROM dispositivos")) as [any[]]
        rows = Array.isArray(resultado) ? resultado : []
    } catch (error) {
        console.error("Error al consultar dispositivos:", error)
    }

    return (
        <div className={styles.fondo}>
            <h1>Dispositivos</h1>

            <div>
                <Link href="/dispositivos/crear">
                    <button type="button">Agregar dispositivos</button>
                </Link>
            </div>

            {rows.length === 0 ? (
                <p>No hay dispositivos disponibles o la base de datos no está conectada.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Stock</th>
                            <th>Precio</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((d: any) => (
                            <tr key={d.id}>
                                <td>{d.id}</td>
                                <td>{d.nombre}</td>
                                <td>{d.marca}</td>
                                <td>{d.stock}</td>
                                <td>${Number(d.precio)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
