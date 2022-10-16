import { createContext } from "react"
import useAuth from "../hooks/useAuth"
import Fire from "./firebase"
const FireContext = createContext({})

const FireProvider = ({ children }) => {
  const firebase = new Fire()
  const usuario = useAuth()

  return (
    <FireContext.Provider value={{ firebase, usuario }}>
      {children}
    </FireContext.Provider>
  )
}

export default FireContext

export { FireProvider }
