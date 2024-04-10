import {useDispatch, useSelector} from "react-redux";
import {useMemo, useRef} from "react";
import {Marker, useMap} from "react-leaflet";
import {onPositionChange, selectGeneral} from "../../slices/generalSlice";
import L from "leaflet";
import MARKER_ICON from "../../assets/icons/marker-edit.svg";


const ICON = new L.Icon({
    iconUrl: MARKER_ICON,
    iconRetinaUrl: MARKER_ICON,
    iconSize: [35, 45],
});

function MarkerDrag() {
    const dispatch = useDispatch()
    const {isEditView, markerPosition, currentUserPosition} = useSelector(selectGeneral)
    const markerRef = useRef(null)

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const {lat, lng} = marker.getLatLng()
                    dispatch(onPositionChange({lat, lng}))
                }
            },
        }),
        [],
    )

    const getPosition = {
        lat: markerPosition.lat || currentUserPosition.lat,
        lng: markerPosition.lng || currentUserPosition.lng
    }

    if (!isEditView) {
        return null
    }

    return <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={getPosition}
        ref={markerRef}
        icon={ICON}>
    </Marker>
}

export default MarkerDrag