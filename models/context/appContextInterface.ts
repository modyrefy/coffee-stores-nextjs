import {CoffeeStoreDashboard} from "../coffee_store_dashboard";

export interface AppContextInterface {
    latLong: string;
    coffeeStores: CoffeeStoreDashboard|null;
}
