import {Marker, Tooltip} from "react-leaflet";
import {mapActions, onPickSelect, PickState, selectMap} from "../slices/mapSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

function MarkersOnMap() {
    const dispatch = useDispatch()
    const {picks} = useSelector(selectMap)

    useEffect(() => {
        dispatch(mapActions.getPicks())
    }, [])

    function handleMarkerClicked(pick: PickState) {
        dispatch(onPickSelect(pick))
    }

    return <>
        {
            picks.map(o => <Marker eventHandlers={{
                click: () => {handleMarkerClicked(o)},
            }} key={o.name} position={[o.position?.lat, o.position?.lng] as [lat: number, lng: number]}>
                <Tooltip>{o.name}</Tooltip>
            </Marker>)
        }
    </>
}

export default MarkersOnMap