import {Geocodes} from "./main";
import {RelatedPlaces} from "./relatedPlaces";
import {Location } from './location';
export interface CoffeeStoreInformation {
    fsq_id: string
    categories: any[]
    chains: any[]
    distance: number
    geocodes: Geocodes
    location: Location
    name: string
    related_places: RelatedPlaces
    timezone: string,
    imageUrl:string|null
}
