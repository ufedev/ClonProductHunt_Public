import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import useFirebase from "../../hooks/useFirebase"
import Layout from "../../src/components/Layout"
import Spinner from "../../src/components/ui/Spinner"
const Producto = () => {
  const [producto, setProducto] = useState({})
  const [load, setLoad] = useState(false)
  const { firebase } = useFirebase()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    async function fn() {
      setLoad(true)
      const prod = await firebase.obtenerProducto(id)

      setProducto(prod)
      setLoad(false)
    }

    fn()
  }, [id])
  console.log(producto)
  return (
    <Layout>
      {load ? (
        <Spinner />
      ) : (
        <>
          {producto?.error ? (
            <p>El Producto no existe...</p>
          ) : (
            <>
              {" "}
              <div className="container">
                <div>
                  <div className="producto__individual--header">
                    <picture>
                      <img
                        src={producto.imgUrl}
                        alt={`imagen ${producto.nombre}`}
                      />
                    </picture>
                    <h1>{producto.nombre}</h1>
                  </div>
                  <div className="producto__individual--body">
                    <p>{producto.descripcion}</p>
                    <div className="producto__individual--acciones">
                      <a
                        className="producto__btn visit"
                        target="__blank"
                        href={producto.url}
                      >
                        Visitar
                      </a>
                      <button className="producto__btn vote__btn">
                        <div>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.6603 5L3 20H20.3205L11.6603 5ZM11.6603 11L8.19615 17H15.1244L11.6603 11Z"
                              fill="currentColor"
                            />
                          </svg>
                          Votar {producto.votos}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  )
}

export default Producto
