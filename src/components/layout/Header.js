import { useContext } from "react"
import Buscador from "../ui/Buscador"
import Navegacion from "../ui/Navegacion"
import Link from "next/link"
import useFirebase from "../../../hooks/useFirebase"
const Header = () => {
  const { usuario, firebase } = useFirebase()

  return (
    <div className="header">
      <header className="header__content container">
        <div className="flex--center">
          <p className="header__logo">P</p>
          <Buscador />
          <Navegacion />
        </div>
        <div className="header__nav">
          {usuario ? (
            <>
              <p className="profile__name">Hola: {usuario.displayName}</p>
              <button
                className="btn--t"
                onClick={() => firebase.cerrarSesion()}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <a className="btn">Ingresar</a>
              </Link>
              <Link href="/signup">
                <a className="btn--t">Registrarse</a>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  )
}

export default Header
