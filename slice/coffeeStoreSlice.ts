import {createSlice} from "@reduxjs/toolkit";
import {AppContextInterface} from "../models/context";
const initialStateObj: AppContextInterface = {coffeeStores: null, latLong:"43.65267326999575,-79.39545615725015"};;
const slice = createSlice({
    name:"coffeeStoreSlice",
    initialState:initialStateObj,
    reducers:{
        setLoading: (state, action) => {
            // alert('state ' +JSON.stringify(state));
            return {
                ...state,
                isLoading: action.payload,
            }
        },
        setLatLong: (state, action) => {
            return {
                ...state,
                latLong: action.payload,

            }
        },
        setCoffeeStores: (state, action) => {
            return {
                ...state,
                coffeeStores: action.payload,

            }
        },
    }
});
export default slice.reducer;
const {setLoading, setLatLong, setCoffeeStores} = slice.actions;
