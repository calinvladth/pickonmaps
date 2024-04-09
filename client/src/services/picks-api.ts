import {PickState} from "../slices/picksSlice";
import axios from "axios";
import {API} from "../utils/constants";

async function getPick({mapId, pickId, token}: { mapId: string, pickId: string, token: string }): Promise<PickState> {
    const response = await axios.get(`${API}/maps/${mapId}/picks/${pickId}`, {
        headers: {
            'Bearer': token
        }
    })
    return response.data
}

async function getPicks({mapId, token}: {mapId: string, token: string}): Promise<PickState[]> {
    const response = await axios.get(`${API}/maps/${mapId}/picks/`, {
        headers: {
            'Bearer': token
        }
    })
    return response.data
}

async function createPick({pick, mapId, token}: {pick: PickState, mapId: string, token: string}) {
    const response = await axios.post(`http://localhost:3000/maps/${mapId}/picks/`, pick, {
        headers: {
            'Bearer': token
        }
    })
    return response.data
}

export async function editPick({pick, mapId, token}: {pick: PickState, mapId: string, token: string}) {
    const response = await axios.patch(`http://localhost:3000/maps/${mapId}/picks/${pick.id}/`, pick, {
        headers: {
            'Bearer': token
        }
    })
    return response.data
}

async function deletePick({pick, mapId, token}: {pick: PickState, mapId: string, token: string}) {
    await axios.delete(`http://localhost:3000/maps/${mapId}/picks/${pick.id}/`, {
        headers: {
            'Bearer': token
        }
    })
}

export const picksApi = {
    getPick,
    getPicks,
    createPick,
    editPick,
    deletePick
}