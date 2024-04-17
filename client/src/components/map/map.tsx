import {MapContainer, TileLayer} from 'react-leaflet'
import {useSelector} from "react-redux";
import {MapActions} from "../map-actions";
import {selectGeneral} from "../../slices/generalSlice";
import handleMapDefaultPosition from "../../utils/handleMapDefaultPosition";
import MarkersOnMap from "./markers-on-map";
import {LatLngExpression} from "leaflet";
import CurrentLocation from "./current-location";

function Map() {
    const {isLoading, markerPosition, currentUserPosition, mapZoom} = useSelector(selectGeneral)


    if (isLoading) {
        return <p>Map loading ...</p>
    }


    return <MapContainer center={Object.values(handleMapDefaultPosition({currentUserPosition, markerPosition})) as LatLngExpression} zoom={mapZoom} scrollWheelZoom={true}
                         style={{width: "100%", height: "inherit"}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CurrentLocation/>
        <MarkersOnMap/>

        <MapActions.Search />
        <MapActions.SetCenterPosition/>
        <MapActions.WatchPosition/>
        <MapActions.WatchZoom/>
        <MapActions.MarkerDrag/>
    </MapContainer>
}

export default Map