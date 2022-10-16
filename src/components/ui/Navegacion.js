import Link from "next/link"
import useFirebase from "../../../hooks/useFirebase"

const Navegacion = () => {
  const { usuario } = useFirebase()

  return (
    <nav className="navegacion">
      <Link href="/">Inicio</Link>
      <Link href="/populares">Populares</Link>

      {usuario && <Link href="/nuevo-producto">Productos</Link>}
    </nav>
  )
}

export default Navegacion
