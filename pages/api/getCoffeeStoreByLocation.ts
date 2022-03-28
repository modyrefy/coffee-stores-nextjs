// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {CoffeeStoreDashboard} from "../../models/coffee_store_dashboard";
import {fecthCoffeeStores} from "../../lib";

type Data = {
    name: string
}

const getCoffeeStoreByLocation = async(
    req: NextApiRequest,
    res: NextApiResponse<CoffeeStoreDashboard>
)=> {
    try {
        let latLong: string = <string>req.query.latLong;
        console.log('latLong',latLong)
        const data = await fecthCoffeeStores(latLong);
        //console.log('data',data);
        res.status(200).json(data);
    } catch (error: any) {
        console.log('error occurred', error);
        const errorObject:CoffeeStoreDashboard={results: [], message:error.message};
        res.status(500).json(errorObject);
    }
}
export  default getCoffeeStoreByLocation;
