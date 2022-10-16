import { useState, useEffect } from "react"
import Layout from "../src/components/Layout"
import useFirebase from "../hooks/useFirebase"
export default function Home() {
  const { firebase } = useFirebase()
  const [productos, setProductos] = useState([])

  useEffect(() => {
    async function getProd() {
      const prod = await firebase.obtenerProductos()

      setProductos(prod)
    }

    getProd()
  }, [])
  console.log(productos)
  return (
    <Layout>
      <div className="container"></div>
    </Layout>
  )
}
