import Link from "next/link"

import styles from "../dispositivos.module.css"

export default function CrearDispositivoPage() {
    return (
        <main className={styles.fondo}>
            <h1>Agregar dispositivo</h1>

            <form>
                <label>
                    Nombre
                    <input type="text" name="nombre" placeholder="Ej: Notebook" />
                </label>

                <label>
                    Marca
                    <input type="text" name="marca" placeholder="Ej: Samsung" />
                </label>

                <label>
                    Stock
                    <input type="number" name="stock" min={0} defaultValue={0} />
                </label>

                <label>
                    Precio
                    <input type="number" name="precio" min={0} step="0.01" defaultValue={0} />
                </label>

                <div>
                    <button type="submit">Guardar</button>
                    <Link href="/dispositivos">
                        <button type="button">Volver</button>
                    </Link>
                </div>
            </form>
        </main>
    )
}
