import {MapContainer, TileLayer} from 'react-leaflet'
import MarkersOnMap from "./markers-on-map";
import MapPickClicked from "./map-pick-clicked";
import {useSelector} from "react-redux";
import {selectPicks} from "../slices/picksSlice";
import MapGetCenter from "./map-get-center";
import Modals from "./modals";
import MapActions from "./MapActions";

function Map() {
    const {isEdit, position} = useSelector(selectPicks)

    return <MapContainer center={position} zoom={15} scrollWheelZoom={true}
                         style={{width: "100%", height: "inherit", cursor: isEdit ? 'pointer' : 'grab'}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
            isEdit ?
                <>
                    <MapActions.MovingMarker/>
                </> :
                <>
                    <MarkersOnMap/>
                    <MapGetCenter/>
                    <MapPickClicked/>
                </>
        }
        <Modals/>
    </MapContainer>
}

export default Map