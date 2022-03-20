import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {createContext} from "react";
import {AppContextInterface} from "../models/context";

const StoreContext=createContext<AppContextInterface>(null);
const appContext:AppContextInterface={coffeeStores: null, latLong:"43.65267326999575,-79.39545615725015"}

function MyApp({ Component, pageProps }: AppProps) {
  return(
      <StoreContext.Provider value={appContext}>
          <>
          <Component {...pageProps} />
          <footer>
              <p>© 2022 Coffee Store</p>
          </footer>
      </>
      </StoreContext.Provider>
   )
}

export default MyApp
