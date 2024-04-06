import {useDispatch, useSelector} from "react-redux";
import {useMemo, useRef} from "react";
import {Marker} from "react-leaflet";
import {onMarkerDrag, selectGeneral} from "../../slices/generalSlice";


function MarkerDrag() {
    const dispatch = useDispatch()
    const {markerPosition} = useSelector(selectGeneral)
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


    return <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={{lat: markerPosition.lat as number, lng: markerPosition.lng as number}}
        ref={markerRef}>
    </Marker>
}

export default MarkerDrag