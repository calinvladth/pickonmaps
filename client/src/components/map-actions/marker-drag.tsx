import {useDispatch, useSelector} from "react-redux";
import {useMemo, useRef} from "react";
import {Marker} from "react-leaflet";
import {onMarkerDrag, selectGeneral} from "../../slices/generalSlice";


function MarkerDrag() {
    const dispatch = useDispatch()
    const {markerPosition, currentUserPosition} = useSelector(selectGeneral)
    const markerRef = useRef(null)


    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const {lat, lng} = marker.getLatLng()
                    dispatch(onMarkerDrag({lat, lng}))
                }
            },
        }),
        [],
    )

    const getPosition = {
        lat: markerPosition.lat || currentUserPosition.lat,
        lng: markerPosition.lng || currentUserPosition.lng
    }

    return <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={getPosition}
        ref={markerRef}>
    </Marker>
}

export default MarkerDrag