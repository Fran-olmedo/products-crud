"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from "../../productos.module.css"

export default function editarProducto({params} : any) {

    const router = useRouter();

    const [id, setId] = useState('')
    const [codigo, setCodigo] = useState('')
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')

    useEffect( () => {
        async function cargar() {
            const { id } = await params
            setId(id)
            const respuesta = await fetch(`/api/productos/${id}`)
            const producto = await respuesta.json()
            setCodigo(producto.codigo)
            setNombre(producto.nombre)
            setPrecio(producto.precio)
        } cargar()
    }, [params])

    async function guardar(e: React.FormEvent) {
        e.preventDefault()
        await fetch(`/api/productos/${id}` , {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                codigo,
                nombre,
                precio
            })
        })
        router.push('/productos')
    }

    return(
        <form onSubmit={guardar} className={styles.form}>
                        <input value={codigo} placeholder="codigo" type="text" className={styles.field} onChange={e => setCodigo(e.target.value)}/>

                        <input value={nombre} placeholder="nombre" type="text" className={styles.field} onChange={e => setNombre(e.target.value)}/>
                        <input value={precio} placeholder="precio" type="number" className={styles.field} onChange={e => setPrecio(e.target.value)}/>
                        <button className={styles.button}>Guardar</button>

        </form>
    )
}