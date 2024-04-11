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
    }, [dispatch, map])

    const handleSearch = useCallback((data) => {
        dispatch(onPositionChange({lat: data.location?.y, lng: data.location?.x},))
    }, [dispatch, map])

    useEffect(() => {
        if (!isEditView) {
            map.on('dragend', onMove)
        }
        map.on('geosearch/showlocation', handleSearch)

        return () => {
            map.off('dragend', onMove)
            map.off('geosearch/showlocation', handleSearch)
        }
    }, [isEditView, map, onMove])

    return null
}

export default SetCenterPosition