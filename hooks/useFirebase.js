import { useContext } from "react"
import FireContext from "../firebase/context"

export default function useFirebase() {
  return useContext(FireContext)
}
