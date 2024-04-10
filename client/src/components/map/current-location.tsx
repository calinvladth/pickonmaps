import {useEffect, useState} from "react";
import {Marker, Popup, useMap} from "react-leaflet";
import {useDispatch, useSelector} from "react-redux";
import {onCurrentLocation, selectGeneral} from "../../slices/generalSlice";
import L from 'leaflet';
import MARKER_USER_LOCATION_ICON from '../../assets/icons/marker-user-location.svg'

const ICON = new L.Icon({
    iconUrl: MARKER_USER_LOCATION_ICON,
    iconRetinaUrl: MARKER_USER_LOCATION_ICON,
    iconSize: [35,45],
});

function CurrentLocation() {
    const {currentUserPosition} = useSelector(selectGeneral)
    const dispatch = useDispatch()

    const map = useMap();

    useEffect(() => {
        if (!currentUserPosition.lat && !currentUserPosition.lng) {
            map.locate().on("locationfound", function (e) {
                dispatch(onCurrentLocation(e.latlng))
            });
        }
    }, [currentUserPosition, dispatch, map]);

    return currentUserPosition.lat && currentUserPosition.lng ? (
        <Marker position={currentUserPosition} icon={ICON}>
            <Popup>
                You are here
            </Popup>
        </Marker>
    ) : null;
}

export default CurrentLocation