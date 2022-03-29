import {AppContextInterface} from "../models/context";
import {createContext, ReactElement,PropsWithChildren , useReducer} from "react";
import coffeeStoreSlice from "../slice/coffeeStoreSlice";
export const initialState:AppContextInterface={coffeeStores: null, latLong:"43.65267326999575,-79.39545615725015"};
//https://hmh.engineering/using-react-contextapi-usereducer-as-a-replacement-of-redux-as-a-state-management-architecture-336452b2930e
//https://dev.to/bigaru/creating-persistent-synchronized-global-store-using-react-hooks-in-typescript-209a
//https://shevchenkonik.com/blog/react-typescript-mobx
//https://felixgerschau.com/react-typescript-context/
//https://blog.logrocket.com/how-to-use-react-context-typescript/
//https://gist.github.com/tattali/e56383dbca18322af7a4f3204bd6eddc
export const ACTION_TYPES = {
    SET_LAT_LONG: "SET_LAT_LONG",
    SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (state:AppContextInterface, action:any) => {
    switch (action.type) {
        case ACTION_TYPES.SET_LAT_LONG: {
            return { ...state, latLong: action.payload.latLong };
        }
        case ACTION_TYPES.SET_COFFEE_STORES: {
            return { ...state, coffeeStores: action.payload.coffeeStores };
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
export const StoreContext=createContext<AppContextInterface>(initialState);

interface StoreProviderProps {
    children: React.ReactElement;
}

const StoreProvider =({ children }:StoreProviderProps):ReactElement => {
    const initialState = {
        latLong: "",
        coffeeStores: [],
    };

    const [state, dispatch] = useReducer(storeReducer, initialState);

    return (
        <StoreContext.Provider value={{ state.initialState, dispatch }}>
    {children}
    </StoreContext.Provider>
)};



export default StoreProvider;
