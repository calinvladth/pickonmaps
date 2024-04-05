import {useCallback, useEffect} from "react";
import {useMap} from "react-leaflet";
import {useDispatch} from "react-redux";
import {onMapMove} from "../slices/picksSlice";

function MapGetCenter() {
    const dispatch = useDispatch()
    const map = useMap()

    const onMove = useCallback(() => {
        dispatch(onMapMove(map.getCenter()))
    }, [map])

    useEffect(() => {
        map.on('moveend', onMove)
        return () => {
            map.off('moveend', onMove)
        }
    }, [map, onMove])

    return null
}

export default MapGetCenter