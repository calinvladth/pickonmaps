import {PickState} from "../slices/picksSlice";
import axios from "axios";
import {API} from "../utils/constants";

async function getPick({mapId, pickId}: { mapId: string, pickId: string }): Promise<PickState> {
    const response = await axios.get(`${API}/maps/${mapId}/picks/${pickId}`)
    return response.data
}

async function getPicks(mapId: string): Promise<PickState[]> {
    const response = await axios.get(`${API}/maps/${mapId}/picks/`)
    return response.data
}

async function createPick({pick, mapId}: {pick: PickState, mapId: string}) {
    const response = await axios.post(`http://localhost:3000/maps/${mapId}/picks/`, pick)
    return response.data
}

export async function editPick({pick, mapId}: {pick: PickState, mapId: string}) {
    const response = await axios.patch(`http://localhost:3000/maps/${mapId}/picks/${pick.id}/`, pick)
    return response.data
}

async function deletePick({pick, mapId}: {pick: PickState, mapId: string}) {
    await axios.delete(`http://localhost:3000/maps/${mapId}/picks/${pick.id}/`)
}

export const picksApi = {
    getPick,
    getPicks,
    createPick,
    editPick,
    deletePick
}