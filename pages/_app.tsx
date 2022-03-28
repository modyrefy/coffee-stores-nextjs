import '../styles/globals.css'
import type { AppProps } from 'next/app'
import StoreProvider from "../store/store-context";




function MyApp({ Component, pageProps }: AppProps) {
  return(
      <StoreProvider>
          <>
          <Component {...pageProps} />
          <footer>
              <p>© 2022 Coffee Store</p>
          </footer>
      </>
      </StoreProvider>
   )
}

export default MyApp
