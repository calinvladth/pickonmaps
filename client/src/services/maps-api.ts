import axios from "axios";
import {MapState} from "../slices/mapsSlice";
import {API} from "../utils/constants";

async function getMap(mapId: string): Promise<MapState> {
    const response = await axios.get(`${API}/maps/${mapId}`)
    return response.data
}
async function getMaps(): Promise<MapState[]> {
    const response = await axios.get(`${API}/maps/`)
    return response.data
}

async function createMap(map: MapState) {
    const response = await axios.post(`${API}/maps/`, map)
    return response.data
}

export async function editMap(map: MapState) {
    const response = await axios.patch(`${API}/maps/${map.id}/`, map)
    return response.data
}

async function deleteMap(map: MapState) {
    await axios.delete(`${API}/maps/${map.id}/`)
}

export const mapsApi = {
    getMap,
    getMaps,
    createMap,
    editMap,
    deleteMap
}