import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {picksApi} from "../services/picks-api";
import {message} from "antd";
import handleRequestErrors from "../utils/handleRequestErrors";

export interface PickState {
    id?: string,
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


export const getPick = createAsyncThunk('pick/getPick', async ({mapId, pickId}: { mapId: string, pickId: string }, {getState, rejectWithValue}) => {
    try {
        const {user} = getState()
        return await picksApi.getPick({mapId, pickId, token: user.token})
    } catch (err) {
        return rejectWithValue(handleRequestErrors(err))
    }

})

export const getPicks = createAsyncThunk('pick/getPicks', async (mapId: string, {getState, rejectWithValue}) => {
    try {
        const {user} = getState()
        return await picksApi.getPicks({mapId, token: user.token})
    } catch (err) {
        return rejectWithValue(handleRequestErrors(err))
    }
})

export const savePick = createAsyncThunk('pick/savePick', async ({
                                                                    pick,
                                                                    mapId,
                                                                    cb
                                                                }: { pick: PickState, mapId: string, cb: () => void }, {getState, dispatch, rejectWithValue}) => {
    try {
        const {user} = getState()
        pick.id ? await picksApi.editPick({pick, mapId, token: user.token}) : await picksApi.createPick({pick, mapId, token: user.token})
        dispatch(getPicks(mapId))
        cb()
        return {id: pick.id}
    } catch (err) {
        return rejectWithValue(handleRequestErrors(err))
    }
})

export const deletePick = createAsyncThunk('map/deletePick', async ({
                                                                        pick,
                                                                        mapId,
                                                                        cb
                                                                    }: { pick: PickState, mapId: string, cb: () => void }, {getState, dispatch, rejectWithValue}) => {
    try {
        const {user} = getState()
        await picksApi.deletePick({pick, mapId, token: user.token})
        cb()
        dispatch(getPicks(mapId))
    } catch (err) {
        return rejectWithValue(handleRequestErrors(err))
    }
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
        onPickReset: (state) => {
            state.picks = []
            state.pick = initialState.pick
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
            .addCase(getPicks.fulfilled, (state, {payload}) => {
                state.picks = payload
                state.isLoading = false
            })
            .addCase(getPicks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPicks.rejected, (state, {payload}) => {
                state.isLoading = false
                message.error(payload as string)
            })

        builder
            .addCase(savePick.fulfilled, (state, {payload}) => {
                state.isSaveLoading = false
                message.success(payload?.id ? "Pick edited successfully" : "Pick created successfully")
            })
            .addCase(savePick.pending, (state) => {
                state.isSaveLoading = true
            })
            .addCase(savePick.rejected, (state, {payload}) => {
                state.isSaveLoading = false
                message.error(payload as string)
            })

        builder
            .addCase(deletePick.fulfilled, (state) => {
                delete state.pick.id
                state.pick.category = ''
                state.pick.name = ''
                state.isDeleteLoading = false
                message.success("Pick removed successfully")
            })
            .addCase(deletePick.pending, (state) => {
                state.isDeleteLoading = true
            })
            .addCase(deletePick.rejected, (state, {payload}) => {
                state.isDeleteLoading = false
                message.error(payload as string)
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