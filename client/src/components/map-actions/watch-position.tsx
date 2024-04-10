import {useMap} from "react-leaflet";
import {useSelector} from "react-redux";
import {selectGeneral} from "../../slices/generalSlice";
import {useEffect} from "react";
import handleMapDefaultPosition from "../../utils/handleMapDefaultPosition";

function WatchPosition() {
    const map = useMap()
    const {isEditView, currentUserPosition, markerPosition} = useSelector(selectGeneral)

    useEffect(() => {
        if (!isEditView) {
            map.setView(handleMapDefaultPosition({currentUserPosition, markerPosition}), map.getZoom(), {
                animate: true,
            })
        }

    }, [currentUserPosition, isEditView, map, markerPosition])

    return null
}

export default WatchPosition