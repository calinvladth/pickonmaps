import {useMap} from "react-leaflet";
import {useEffect} from "react";

function MapPickClicked() {
    const map = useMap()
    const channel = new BroadcastChannel('mapListPickClicked')

    useEffect(() => {
        channel.addEventListener('message', event => {
            map.setView({lat: event.data.lat, lng: event.data.lng}, map.getZoom(), {animate: true})
        })
    }, [])

    return null
}

export default MapPickClicked