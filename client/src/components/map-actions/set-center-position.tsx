import {useCallback, useEffect} from "react";
import {useMap} from "react-leaflet";
import {useDispatch, useSelector} from "react-redux";
import {onPositionChange, selectGeneral} from "../../slices/generalSlice";

function SetCenterPosition() {
    const dispatch = useDispatch()
    const {isEditView} = useSelector(selectGeneral)
    const map = useMap()

    const onMove = useCallback(() => {
        dispatch(onPositionChange(map.getCenter()))
    }, [map])

    useEffect(() => {
        if (!isEditView) {
            map.on('dragend', onMove)
        }

        return () => {
            map.off('dragend', onMove)
        }
    }, [isEditView, map, onMove])

    return null
}

export default SetCenterPosition