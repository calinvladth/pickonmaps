import {useMapEvents} from "react-leaflet";
import {useDispatch} from "react-redux";
import {onMapZoom, selectGeneral} from "../../slices/generalSlice";

function WatchZoom() {
    const dispatch = useDispatch(selectGeneral)
    const mapEvents = useMapEvents({
        zoomend: () => {
            dispatch(onMapZoom(mapEvents.getZoom()))
        },
    });

    return null
}

export default WatchZoom