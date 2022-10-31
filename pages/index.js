import { useState, useEffect } from "react"
import Layout from "../src/components/Layout"
import useFirebase from "../hooks/useFirebase"
import Producto from "../src/components/ui/Producto"
import Spinner from "../src/components/ui/Spinner"
export default function Home() {
  const { firebase } = useFirebase()
  const [productos, setProductos] = useState([])
  const [load, setLoad] = useState(false)
  useEffect(() => {
    async function getProd() {
      setLoad(true)

      const prod = await firebase.obtenerProductos("creado", "desc")

      setProductos(prod)
      setLoad(false)
    }

    getProd()
  }, [])

  return (
    <Layout>
      <div className="container">
        {load ? (
          <Spinner />
        ) : (
          <div className="productos">
            {productos.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
