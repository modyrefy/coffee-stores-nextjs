import {TrackLocationModel} from "../models/track-location";
import {useState} from "react";


export const useTrackLocation=()=>{
     const [locationErrorMsg, setLocationErrorMsg] = useState("");
     const [isFindingLocation, setIsFindingLocation] = useState(false);
    const [latLong, setLatLong] = useState("");

    const success=(position:GeolocationPosition)=>{
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatLong(`${latitude},${longitude}`);
        setLocationErrorMsg("");
        setIsFindingLocation(false);
    };
    const error=()=>{
        setIsFindingLocation(false);
       setLocationErrorMsg( "Unable to retrieve your location");
    };
    const handleTrackLocation=()=>{
        setIsFindingLocation(true);
        if (!navigator.geolocation) {
            setLocationErrorMsg("Geolocation is not supported by your browser");
            setIsFindingLocation(false);
        } else {
            // status.textContent = "Locating…";
            navigator.geolocation.getCurrentPosition(success, error);
        }
    };
    return {
        handleTrackLocation,
        latLong,
        locationErrorMsg,
        isFindingLocation

    };
}





// export const useTrackLocation=():TrackLocationModel=>{
//     let locationModel:TrackLocationModel={latitude: 0, longitude: 0 ,errorMessage:null};
//     // const [locationErrorMsg, setLocationErrorMsg] = useState("");
//     // const [isFindingLocation, setIsFindingLocation] = useState(false);
//
//     const success=(position:GeolocationPosition)=>{
//         locationModel.latitude = position.coords.latitude;
//         locationModel.longitude = position.coords.longitude;
//         locationModel.errorMessage=null;
//
//     };
//     const error=()=>{
//         locationModel.latitude = 0;
//         locationModel.longitude = 0;
//         locationModel.errorMessage="Unable to retrieve your location";
//     };
//     const handleTrackLocation=()=>{
//         if (!navigator.geolocation) {
//             locationModel.errorMessage="Geolocation is not supported by your browser";
//            // setLocationErrorMsg("Geolocation is not supported by your browser");
//             //setIsFindingLocation(false);
//         } else {
//             // status.textContent = "Locating…";
//             navigator.geolocation.getCurrentPosition(success, error);
//         }
//
//     };
//
//     handleTrackLocation();
//     return  locationModel;
// }
