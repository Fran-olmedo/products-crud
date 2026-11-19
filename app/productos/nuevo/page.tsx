"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import styles from "../productos.module.css"


export default function nuevoProducto() {
    const router = useRouter()
    const [codigo, setCodigo] = useState('')
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    async function guardar(e: React.FormEvent) {
        e.preventDefault()
        await fetch(`/api/productos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                codigo,
                nombre,
                precio
            })
        })
        router.push('/productos')
    }

    return (
        <form onSubmit={guardar} className={styles.form}>
            <input value={codigo} placeholder="codigo" type="text" className={styles.field} onChange={e => setCodigo(e.target.value)} />

            <input value={nombre} placeholder="nombre" type="text" className={styles.field} onChange={e => setNombre(e.target.value)} />
            <input value={precio} placeholder="precio" type="number" className={styles.field} onChange={e => setPrecio(e.target.value)} />
            <button className={styles.button}>Guardar</button>

        </form>
    )
}

