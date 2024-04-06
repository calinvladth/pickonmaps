import {useEffect, useState} from "react";
import {Marker, Popup, useMap} from "react-leaflet";
import {useDispatch} from "react-redux";
import {onMapMove} from "../../slices/generalSlice";

function GetCurrentLocation() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    const dispatch = useDispatch()

    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            dispatch(onMapMove(e.latlng))
            map.flyTo(e.latlng, map.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(map);
            setBbox(e.bounds.toBBoxString().split(","));
        });
    }, [map]);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>
                You are here. <br />
                Map bbox: <br />
                <b>Southwest lng</b>: {bbox[0]} <br />
                <b>Southwest lat</b>: {bbox[1]} <br />
                <b>Northeast lng</b>: {bbox[2]} <br />
                <b>Northeast lat</b>: {bbox[3]}
            </Popup>
        </Marker>
    );
}

export default GetCurrentLocation