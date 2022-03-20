//initialize unsplash
import { createApi } from "unsplash-js";
import {CoffeeStoreDashboard} from "../models/coffee_store_dashboard";
import {isBigInt64Array} from "util/types";

// on your node server
// @ts-ignore
const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: "coffee shop",
        perPage: 40,
    });
    const unsplashResults = photos.response?.results || [];
    return unsplashResults.map((result) => result.urls["small"]);
};

export  const fecthCoffeeStores=async (latLong:string="43.65267326999575,-79.39545615725015"):Promise<CoffeeStoreDashboard>=> {
    //const latLong: string = ;
    const limit: number = 10;
    const query: string = "coffee stores";
    // @ts-ignore
    const response = await fetch(`https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`, {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        },
    });
    const data: CoffeeStoreDashboard = await response.json();
    if(data!=null && data.results!=null && data.results.length!=0)
    {
        const photos = await getListOfCoffeeStorePhotos();
        data.results.map((row,index)=>{
            row.imageUrl=photos[index]

        })
    }
    //console.log('data', data)
    return data;
}
