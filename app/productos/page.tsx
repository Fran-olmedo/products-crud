"use client"
import { useEffect, useState } from "react"

import styles from "./productos.module.css"
import Link from 'next/link'

export default function Productos() {
    const [productos, setProductos] = useState<any[]>([])
    const [busqueda, setBusqueda] = useState("")
    const [cargando, setCargando] = useState(true)

    async function cargarProductos() {
        try {
            const respuesta = await fetch(`/api/productos`)
            const datos = await respuesta.json()
            setProductos(datos)
        } catch (error) {
            console.error("Error al cargar los productos:", error)
        } finally {
            setCargando(false)
        }
    }

    async function eliminar(id: number) {
        const confirmado = window.confirm("¿Seguro que querés eliminar este producto?")
        if (!confirmado) return

        await fetch(`/api/productos/${id}`, { method: 'DELETE' })
        cargarProductos()
    }

    useEffect(() => { cargarProductos() }, [])

    const texto = busqueda.toLowerCase().trim()
    const productosFiltrados = productos.filter(producto =>
        String(producto.nombre).toLowerCase().includes(texto) ||
        String(producto.codigo).toLowerCase().includes(texto)
    )

    return (
        <div className={styles.container}>
            <div className={styles.buttonWrapper}>
                <Link href="/productos/nuevo"><button className={styles.button + ' ' + styles.agregar}>Agregar un producto</button></Link>
            </div>

            <input
                type="text"
                placeholder="Buscar por código o nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className={styles.buscador}
            />

            {cargando ? (
                <p className={styles.mensaje}>Cargando...</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                            <th>
                                <button className={styles.button + ' ' + styles.agregar}>Ordenar por precio</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.length === 0 ? (
                            <tr>
                                <td colSpan={7}>No se encontraron productos</td>
                            </tr>
                        ) : (
                            productosFiltrados.map(producto => (
                                <tr key={producto.id}>
                                    <td>{producto.id}</td>
                                    <td>{producto.codigo}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.precio}</td>
                                    <td className={styles.buttonCell}>
                                        <Link href={`/productos/${producto.id}/editar`}><button className={styles.button + ' ' + styles.editar}>Editar</button></Link>
                                    </td>
                                    <td className={styles.buttonCell}>
                                        <button className={styles.button + ' ' + styles.eliminar} onClick={() => eliminar(producto.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}