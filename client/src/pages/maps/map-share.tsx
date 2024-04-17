import {MapContainer, TileLayer} from 'react-leaflet'
import {useDispatch, useSelector} from "react-redux";
import {generalActions, selectGeneral} from "../../slices/generalSlice";
import handleMapDefaultPosition from "../../utils/handleMapDefaultPosition";
import {LatLngExpression} from "leaflet";
import {useEffect} from "react";
import {useParams, useSearchParams} from "react-router-dom";

import {DEFAULT_ZOOM} from "../../utils/constants";
import MarkersOnMap from "../../components/map/markers-on-map";

function MapShare() {
    const {isLoading, hasError, markerPosition, currentUserPosition} = useSelector(selectGeneral)
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const {mapId} = useParams()
    const zoom = searchParams.get('zoom')

    useEffect(() => {
        if (mapId) {
            dispatch(generalActions.getMap(mapId))
        }
    }, [mapId])


    if (isLoading) {
        return <p>Map loading ...</p>
    }

    if (hasError) {
        return <p>Map unavailable</p>
    }

    return <MapContainer
        center={Object.values(handleMapDefaultPosition({currentUserPosition, markerPosition})) as LatLngExpression}
        zoom={parseInt(zoom as string) || DEFAULT_ZOOM} scrollWheelZoom={true}
        style={{width: "100%", height: "inherit"}}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/*<CurrentLocation/>*/}
        <MarkersOnMap/>
    </MapContainer>
}

export default MapShare