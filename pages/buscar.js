/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import useFirebase from "../hooks/useFirebase"
import Layout from "../src/components/Layout"
import Producto from "../src/components/ui/Producto"
import Spinner from "../src/components/ui/Spinner"
const buscar = () => {
  const { firebase } = useFirebase()
  const [resultado, setResultado] = useState([])
  const [productos, setProductos] = useState([])
  const [load, setLoad] = useState(false)
  const router = useRouter()
  const {
    query: { q },
  } = router

  useEffect(() => {
    async function obtener() {
      setLoad(true)
      const prod = await firebase.obtenerProductos()
      setProductos(prod)
      setLoad(false)
    }
    obtener()
  }, [])

  useEffect(() => {
    if (!q) return

    const prod = productos.filter((producto) => {
      if (
        producto.nombre.toLowerCase().includes(q.toLocaleLowerCase()) ||
        producto.descripcion.toLocaleLowerCase().includes(q.toLocaleLowerCase())
      ) {
        return producto
      }
    })

    setResultado(prod)
  }, [q, productos])

  return (
    <Layout>
      {" "}
      <div className="container">
        {load ? (
          <Spinner />
        ) : (
          <div className="productos">
            {resultado.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default buscar
