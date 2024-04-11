import {useMap} from "react-leaflet";
import {useEffect} from "react";
import {GeoSearchControl, OpenStreetMapProvider} from "leaflet-geosearch";
import 'leaflet-geosearch/dist/geosearch.css';


function Search() {
    const map = useMap()
    const provider = new OpenStreetMapProvider();

    useEffect(() => {
        const searchControl = new GeoSearchControl({
            provider,
            showMarker: false,
            showPopup: false,
            popupFormat: ({query, result}) => result.label,
            maxMarkers: 3,
            retainZoomLevel: true,
            animateZoom: true,
            autoClose: false,
            searchLabel: "string",
            keepResult: true
        })

        map.addControl(searchControl)
        return () => map.removeControl(searchControl)
    }, [map, provider])

    return null
}

export default Search