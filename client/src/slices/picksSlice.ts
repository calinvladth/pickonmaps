import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {picksApi} from "../services/picks-api";
import {message} from "antd";

export interface PickState {
    id?: string
    category: string,
    name: string,
    text: string,
    lat?: number,
    lng?: number
}

export interface PicksState {
    isLoading: boolean,
    isLoadingPick: boolean,
    isSaveLoading: boolean
    isDeleteLoading: boolean,
    isPickEdit: boolean,
    position: { lat: number, lng: number },
    picks: PickState[],
    pick: PickState
}

const initialState: PicksState = {
    isLoading: false,
    isLoadingPick: false,
    isSaveLoading: false,
    isDeleteLoading: false,
    isPickEdit: false,
    position: {lat: 44.43996963311098, lng: 26.09257221221924},
    picks: [],
    pick: {
        category: '',
        name: '',
        lat: 0,
        lng: 0,
        text: ''
    }
}


export const getPick = createAsyncThunk('map/getPick', async ({mapId, pickId}: { mapId: string, pickId: string }) => {
    return await picksApi.getPick({mapId, pickId})
})

export const getPicks = createAsyncThunk('map/getPicks', async (mapId: string) => {
    return await picksApi.getPicks(mapId)
})

export const savePick = createAsyncThunk('map/savePick', async ({
                                                                    pick,
                                                                    mapId,
                                                                    cb
                                                                }: { pick: PickState, mapId: string, cb: () => void }, {dispatch}) => {
    pick.id ? await picksApi.editPick({pick, mapId}) : await picksApi.createPick({pick, mapId})
    dispatch(getPicks(mapId))
    cb()

    message.success(pick.id ? "Pick edited successfully" : "Pick created successfully")
})

export const deletePick = createAsyncThunk('map/deletePick', async ({
                                                                        pick,
                                                                        mapId,
                                                                        cb
                                                                    }: { pick: PickState, mapId: string, cb: () => void }, {dispatch}) => {
    await picksApi.deletePick({pick, mapId})
    cb()
    dispatch(getPicks(mapId))

    message.success("Pick removed successfully")
})


export const picksSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        onMapMove: (state, action) => {
            if (!state.isPickEdit && !state.pick.id) {
                state.position.lat = action.payload?.lat
                state.position.lng = action.payload?.lng
            }
        },
        onEdit: (state, action) => {
            state.isPickEdit = action.payload

            if (!state.pick.lat && !state.pick.lng) {
                state.pick.lat = state.position?.lat
                state.pick.lng = state.position?.lng
            }

            if (!action.payload) {
                delete state.pick.id
                state.pick.category = ''
                state.pick.name = ''
                state.pick.text = ''
                state.pick.lat = 0
                state.pick.lng = 0
            }
        },
        onPickSelect: (state, action) => {
            state.pick = action.payload
        },
        onPickEdit: (state, action) => {
            state.pick = {
                ...state.pick,
                ...action.payload
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPick.pending, (state) => {
                state.isLoadingPick = true
            })
            .addCase(getPick.fulfilled, (state, {payload}) => {
                state.pick = payload
                state.isLoadingPick = false
            })

        builder
            .addCase(getPicks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPicks.fulfilled, (state, {payload}) => {
                state.picks = payload
                state.isLoading = false
            })

        builder
            .addCase(savePick.fulfilled, (state) => {
                state.isPickEdit = false
                state.isSaveLoading = false
            })

        builder
            .addCase(savePick.pending, (state) => {
                state.isSaveLoading = true
            })

        builder
            .addCase(deletePick.fulfilled, (state) => {
                delete state.pick.id
                state.pick.category = ''
                state.pick.name = ''
                state.pick.lat = 0
                state.pick.lng = 0
                state.isDeleteLoading = false
            })
            .addCase(deletePick.pending, (state) => {
                state.isDeleteLoading = true
            })

    }
})

export const {onMapMove, onEdit, onPickSelect, onPickEdit} = picksSlice.actions

export const selectPicks = (state: { picks: PicksState }) => state.picks

export const picksActions = {
    getPick,
    getPicks,
    savePick,
    deletePick
}

export default picksSlice.reducer