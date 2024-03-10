import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {picksApi} from "../services/picks-api";
import {message} from "antd";

export interface PickState {
    id?: string
    category: string,
    name: string,
    text: string,
    position: { lat: number, lng: number }
}

export interface MapState {
    isLoading: boolean,
    isSaveLoading: boolean
    isDeleteLoading: boolean,
    isEdit: boolean,
    isPickView: boolean,
    position: { lat: number, lng: number },
    picks: PickState[],
    pick: PickState
}

const initialState: MapState = {
    isLoading: false,
    isSaveLoading: false,
    isDeleteLoading: false,
    isEdit: false,
    isPickView: false,
    position: {lat: 44.43996963311098, lng: 26.09257221221924},
    picks: [],
    pick: {
        category: '',
        name: '',
        position: {lat: 0, lng: 0},
        text: ''
    }
}

export const getPicks = createAsyncThunk('map/getPicks', async () => {
    return await picksApi.getPicks()
})

export const createPick = createAsyncThunk('map/createPick', async (pick: PickState, {dispatch}) => {
    await picksApi.createPick(pick)
    dispatch(getPicks())
})

export const editPick = createAsyncThunk('map/editPick', async (pick: PickState, {dispatch}) => {
    await picksApi.editPick(pick)
    dispatch(getPicks())
})

export const savePick = createAsyncThunk('map/createPick', async (pick: PickState, {dispatch}) => {
    pick.id ? await picksApi.editPick(pick) : await picksApi.createPick(pick)
    dispatch(getPicks())

    message.success(pick.id ? "Pick edited successfully" : "Pick created successfully")
})

export const deletePick = createAsyncThunk('map/deletePick', async ({
                                                                        pick,
                                                                        cb
                                                                    }: { pick: PickState, cb: () => void }, {dispatch}) => {
    await picksApi.deletePick(pick)
    cb()
    dispatch(getPicks())

    message.success("Pick removed successfully")
})


export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        onMapMove: (state, action) => {
            if (!state.isEdit && !state.isPickView) {
                state.position = action.payload
                state.pick.position = action.payload
            }
        },
        onEdit: (state) => {
            if (!state.pick.position.lat && !state.pick.position.lng) {
                state.pick.position = state.position
            }
            state.isEdit = !state.isEdit
            state.isPickView = false
        },
        onCloseAddEdit: (state) => {
            state.isEdit = false
            state.isPickView = false
            delete state.pick.id
            state.pick.category = ''
            state.pick.name = ''
            state.pick.position = {lat: 0, lng: 0}
        },
        onPickSelect: (state, action) => {
            state.isPickView = true
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
            .addCase(getPicks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPicks.fulfilled, (state, action) => {
                state.picks = action.payload
                state.isLoading = false
            })

        builder
            .addCase(savePick.fulfilled, (state) => {
                delete state.pick.id
                state.pick.category = ''
                state.pick.name = ''
                state.pick.position = {lat: 0, lng: 0}
                state.isEdit = false
                state.isPickView = false
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
                state.pick.position = {lat: 0, lng: 0}
                state.isPickView = false
                state.isDeleteLoading = false
            })
            .addCase(deletePick.pending, (state) => {
                state.isDeleteLoading = true
            })

    }
})

export const {onMapMove, onCloseAddEdit, onEdit, onPickSelect, onPickEdit} = mapSlice.actions

export const selectMap = (state: { map: MapState }) => state.map

export const mapActions = {
    getPicks,
    createPick,
    editPick,
    savePick,
    deletePick
}

export default mapSlice.reducer