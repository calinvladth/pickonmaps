import {PositionInterface} from "../slices/generalSlice";

interface HandleMapDefaultPositionInterface {
    markerPosition: PositionInterface,
    currentUserPosition: PositionInterface
}

function handleMapDefaultPosition({markerPosition, currentUserPosition}: HandleMapDefaultPositionInterface) {
    if (markerPosition.lat && markerPosition.lng) {
        return markerPosition
    }

    return currentUserPosition
}

export default handleMapDefaultPosition