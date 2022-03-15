import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return(<>
   <Component {...pageProps} />
    <footer>
      <p>© 2021 Coffee Store</p>
    </footer>
  </>)
}

export default MyApp
