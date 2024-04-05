import {useDispatch, useSelector} from "react-redux";
import {onPickEdit, selectPicks} from "../../slices/picksSlice";
import {useMemo, useRef} from "react";
import {Marker} from "react-leaflet";

function MovingMarker() {
    const dispatch = useDispatch()
    const {pick} = useSelector(selectPicks)
    const markerRef = useRef(null)

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const {lat, lng} = marker.getLatLng()
                    dispatch(onPickEdit({lat, lng}))
                }
            },
        }),
        [],
    )


    return <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={{lat: pick.lat, lng: pick.lng}}
        ref={markerRef}>
    </Marker>
}

export default MovingMarker