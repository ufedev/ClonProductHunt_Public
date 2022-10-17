/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../src/components/Layout"
import { useState, useEffect, createRef } from "react"
import Router from "next/router"
import useFirebase from "../hooks/useFirebase"
import useValidate from "../hooks/useValidate"
import crearProducto from "../validates/crearProducto"
import { Error } from "../src/stylecomp/stylecomp"
import Spinner from "../src/components/ui/Spinner"
const stateInicial = {
  nombre: "",
  empresa: "",
  imagen: "",
  url: "",
  descripcion: "",
}
const nuevoProducto = () => {
  const { usuario, firebase } = useFirebase()
  const [load, setLoad] = useState(false)
  const imagenFile = createRef()
  useEffect(() => {
    if (!usuario) {
      Router.push("/")
    }
  }, [usuario])

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidate(stateInicial, crearProducto, fn)

  const { nombre, empresa, url, descripcion } = values
  async function fn() {
    const producto = {
      nombre,
      empresa,
      url,
      descripcion,
      imagen: imagenFile.current.files[0],
      votos: 0,
      comentarios: [],
      creado: Date.now(),
    }
    setLoad(true)
    const up = await firebase.nuevoProducto(producto)
    setLoad(false)
    if (up) {
      Router.push("/")
    }
  }
  return (
    <Layout>
      <h4 className="page__title">Crear Publicación</h4>
      <form className="form form--big" onSubmit={handleSubmit}>
        <fieldset className="form__field">
          <legend>Información del Producto</legend>{" "}
          <div className="form__div">
            <label htmlFor="nombre">Nombre</label>
            <input
              name="nombre"
              id="nombre"
              placeholder="Nombre del Producto"
              type="text"
              value={values.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.nombre && <Error>{errors.nombre}</Error>}
          <div className="form__div">
            <label htmlFor="empresa">Empresa</label>
            <input
              name="empresa"
              id="empresa"
              placeholder="Nombre de la Empresa"
              type="text"
              value={values.empresa}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.empresa && <Error>{errors.empresa}</Error>}
          <div className="form__div">
            <label htmlFor="imagen">Imagen</label>
            <input name="imagen" id="imagen" type="file" ref={imagenFile} />
          </div>
          {errors.imagen && <Error>{errors.imagen}</Error>}
          <div className="form__div">
            <label htmlFor="url">URL</label>
            <input
              name="url"
              id="url"
              placeholder="Url del producto"
              value={values.url}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.url && <Error>{errors.url}</Error>}
        </fieldset>

        <fieldset className="form__field">
          <legend>Sobre el producto</legend>
          <div className="form__div">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={values.descripcion}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>

            {errors.descripcion && <Error>{errors.descripcion}</Error>}
          </div>
        </fieldset>

        <input className="btn--t" type="submit" value="Crear" />
      </form>

      {load && <Spinner />}
    </Layout>
  )
}

export default nuevoProducto
