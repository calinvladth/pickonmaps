import axios from "axios";
import {MapState} from "../slices/mapsSlice";
import {API} from "../utils/constants";
import {PositionInterface} from "../slices/generalSlice";

async function getMap({mapId, token}: {mapId: string, token: string}): Promise<MapState & PositionInterface> {
    const response = await axios.get(`${API}/maps/${mapId}`, {
        headers: {
            'Bearer': token
        }
    })
    return response.data
}

async function getMaps(token: string): Promise<MapState[]> {
    const response = await axios.get(`${API}/maps/`, {
        headers: {
            'Bearer': token
        }
    })
    return response.data
}

async function createMap({map, token}: { map: MapState, token: string }) {
    const response = await axios.post(`${API}/maps/`, map, {
        headers: {
            'Bearer': token
        }
    })
    return response.data
}

export async function editMap({map, token}: { map: MapState, token: string }) {
    const response = await axios.patch(`${API}/maps/${map.id}/`, map, {
        headers: {
            'Bearer': token
        }
    })
    return response.data
}

async function deleteMap({mapId, token}: { mapId: string, token: string }) {
    await axios.delete(`${API}/maps/${mapId}/`, {
        headers: {
            'Bearer': token
        }
    })
}

export const mapsApi = {
    getMap,
    getMaps,
    createMap,
    editMap,
    deleteMap
}