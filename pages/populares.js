import { useState, useEffect, Fragment } from "react"
import Layout from "../src/components/Layout"
import useFirebase from "../hooks/useFirebase"
import Producto from "../src/components/ui/Producto"
import Spinner from "../src/components/ui/Spinner"
export default function Populares() {
  const { firebase } = useFirebase()
  const [productos, setProductos] = useState([])
  const [load, setLoad] = useState(false)
  const [field, setField] = useState("votos")
  useEffect(() => {
    async function getProd() {
      setLoad(true)
      const prod = await firebase.obtenerProductos(field, "desc")
      setProductos(prod)

      setLoad(false)
    }

    getProd()
  }, [field])

  return (
    <Layout>
      <div className="container">
        <form className="form__div">
          <label>Ordenar Por </label>
          <select onChange={(e) => setField(e.target.value)}>
            <option value="votos"> +Votos</option>
            <option value="comentarios"> +Comentarios</option>
          </select>
        </form>
        {load ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className="productos">
              {productos.map((producto) => (
                <Producto key={producto.id} producto={producto} />
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </Layout>
  )
}
