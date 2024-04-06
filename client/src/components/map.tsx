import {MapContainer, TileLayer} from 'react-leaflet'
import MarkersOnMap from "./markers-on-map";
import MapPickClicked from "./map-pick-clicked";
import {useSelector} from "react-redux";
import {selectPicks} from "../slices/picksSlice";
import Modals from "./modals";
import MapActions from "./map-actions";
import {selectGeneral} from "../slices/generalSlice";

function Map() {
    const {isPickEdit} = useSelector(selectPicks)
    const {isMapLoading, isEditView, markerPosition} = useSelector(selectGeneral)

    if (isMapLoading) {
        return <p>Map loading ...</p>
    }

    return <MapContainer center={markerPosition} zoom={15} scrollWheelZoom={true}
                         style={{width: "100%", height: "inherit", cursor: isPickEdit ? 'pointer' : 'grab'}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
            isEditView && markerPosition.lat && markerPosition.lng ? <MapActions.MarkerDrag/>
                : <>
                    <MarkersOnMap/>
                </>
        }
        {
            !markerPosition.lat && !markerPosition.lng ? <>
                    {/*<div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'white', zIndex: 1000}}>*/}
                    {/*    Loading ...*/}
                    {/*</div>*/}
                    <MapActions.GetCurrentLocation/>
                </> :
                <MapActions.GetCenterPosition/>
        }

        <MapPickClicked/>

        <Modals/>
    </MapContainer>
}

export default Map