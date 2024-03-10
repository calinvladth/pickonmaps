import {MapContainer, TileLayer} from 'react-leaflet'
import MarkersOnMap from "./markers-on-map";
import MapPickClicked from "./map-pick-clicked";
import EditMap from "./edit-map";
import {useSelector} from "react-redux";
import {selectMap} from "../slices/mapSlice";
import MapGetCenter from "./map-get-center";

function Map() {
    const {isEdit, position} = useSelector(selectMap)

    return <MapContainer center={position} zoom={15} scrollWheelZoom={true}
                         style={{width: "100%", height: "inherit", cursor: isEdit ? 'pointer': 'grab'}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <EditMap/>

        {
            isEdit ?
                <></> :
                <>
                    <MarkersOnMap/>
                    <MapGetCenter/>
                    <MapPickClicked/>
                </>
        }
    </MapContainer>
}

export default Map