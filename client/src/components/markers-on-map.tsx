import {Marker, Tooltip} from "react-leaflet";
import {picksActions, onPickSelect, PickState, selectPicks} from "../slices/picksSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

function MarkersOnMap() {
    const dispatch = useDispatch()
    const {picks} = useSelector(selectPicks)

    useEffect(() => {
        dispatch(picksActions.getPicks())
    }, [])

    function handleMarkerClicked(pick: PickState) {
        dispatch(onPickSelect(pick))
    }

    return <>
        {
            picks.map(o => <Marker eventHandlers={{
                click: () => {handleMarkerClicked(o)},
            }} key={o.name} position={[o.lat, o.lng] as [lat: number, lng: number]}>
                <Tooltip>{o.name}</Tooltip>
            </Marker>)
        }
    </>
}

export default MarkersOnMap