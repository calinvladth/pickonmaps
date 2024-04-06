import {useMap} from "react-leaflet";
import {useEffect} from "react";
import {EVENT_CHANNELS} from "../utils/constants";

function MapPickClicked() {
    const map = useMap()
    const channel = new BroadcastChannel(EVENT_CHANNELS.MOVE_TO_PICK)

    useEffect(() => {
        channel.addEventListener('message', event => {
            map.setView({lat: event.data.lat, lng: event.data.lng}, map.getZoom(), {animate: true})
        })
    }, [])

    return null
}

export default MapPickClicked