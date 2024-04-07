import {useCallback, useEffect} from "react";
import {useMap} from "react-leaflet";
import {useDispatch} from "react-redux";
import {onMapMove} from "../../slices/generalSlice";

function GetCenterPosition() {
    const dispatch = useDispatch()
    const map = useMap()

    const onMove = useCallback(() => {
        dispatch(onMapMove(map.getCenter()))
    }, [map])

    useEffect(() => {
        dispatch(onMapMove(map.getCenter()))
    }, [map])

    useEffect(() => {
        map.on('dragend', onMove)
        return () => {
            map.off('dragend', onMove)
        }
    }, [map, onMove])

    return null
}

export default GetCenterPosition