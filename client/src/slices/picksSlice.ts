import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {picksApi} from "../services/picks-api";
import {message} from "antd";

export interface PickState {
    id?: string
    category: string,
    name: string,
    text: string
}

export interface PicksState {
    isLoading: boolean,
    isLoadingPick: boolean,
    isSaveLoading: boolean
    isDeleteLoading: boolean,
    picks: PickState[],
    pick: PickState
}

const initialState: PicksState = {
    isLoading: false,
    isLoadingPick: false,
    isSaveLoading: false,
    isDeleteLoading: false,
    picks: [],
    pick: {
        category: '',
        name: '',
        text: ''
    }
}


export const getPick = createAsyncThunk('pick/getPick', async ({mapId, pickId}: { mapId: string, pickId: string }) => {
    return await picksApi.getPick({mapId, pickId})
})

export const getPicks = createAsyncThunk('pick/getPicks', async (mapId: string) => {
    return await picksApi.getPicks(mapId)
})

export const savePick = createAsyncThunk('pick/savePick', async ({
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
        onPickSelect: (state, action) => {
            state.pick = action.payload
        },
        onPickEdit: (state, action) => {
            state.pick = {
                ...state.pick,
                ...action.payload
            }
        },
        onPickLoad: (state, {payload}) => {
            state.pick = payload
        },
        onPickReset: () => initialState
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
                state.isDeleteLoading = false
            })
            .addCase(deletePick.pending, (state) => {
                state.isDeleteLoading = true
            })

    }
})

export const {onPickSelect, onPickReset, onPickLoad, onPickEdit} = picksSlice.actions

export const selectPicks = (state: { picks: PicksState }) => state.picks

export const picksActions = {
    getPick,
    getPicks,
    savePick,
    deletePick
}

export default picksSlice.reducer