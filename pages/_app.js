import "../styles/app.css"
import { FireProvider } from "../firebase/context"
function MyApp({ Component, pageProps }) {
  return (
    <FireProvider>
      <Component {...pageProps} />
    </FireProvider>
  )
}

export default MyApp
