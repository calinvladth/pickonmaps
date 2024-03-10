import {useMapEvent} from "react-leaflet/hooks";

function MapClickHandler() {
    // TODO: Move hardcoded naming
    const channel = new BroadcastChannel('mapPosition')
    useMapEvent('click', (e) => {
        channel.postMessage([e.latlng.lat, e.latlng.lng])
    })

    return null
}

export default MapClickHandler