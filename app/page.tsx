import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link href="/productos">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ver Productos
        </button>
      </Link>
      <br />
      <Link href="/dispositivos">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Ver Dispositivos
        </button>
      </Link>
    </div>
  );
}

