import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {message} from "antd";
import {mapsApi} from "../services/maps-api";
import handleRequestErrors from "../utils/handleRequestErrors";

export interface MapState {
    id?: string
    name: string
}

export interface MapsState {
    isLoading: boolean,
    isSaveLoading: boolean
    isDeleteLoading: boolean,
    isMapEdit: boolean,
    maps: MapState[],
    map: MapState
}

const initialState: MapsState = {
    isLoading: false,
    isSaveLoading: false,
    isDeleteLoading: false,
    isMapEdit: false,
    maps: [],
    map: {
        name: '',
    }
}

export const getMaps = createAsyncThunk('map/getMaps', async (_, {getState, rejectWithValue}) => {
    try {
        const {user} = getState()
        return await mapsApi.getMaps(user.token)
    } catch (err) {
        return rejectWithValue(handleRequestErrors(err))
    }
})

export const saveMap = createAsyncThunk('map/createMap', async ({map, cb}: {map: MapState, cb: () => void}, {getState, dispatch, rejectWithValue}) => {
    try {
        const {user} = getState()
        map.id ? await mapsApi.editMap({map, token: user.token}) : await mapsApi.createMap({map, token: user.token})
        dispatch(getMaps())
        cb()
        return {id: map.id}
    } catch (err) {
        return rejectWithValue(handleRequestErrors(err))
    }
})

export const deleteMap = createAsyncThunk('map/deletePick', async ({
                                                                       map,
                                                                       cb
                                                                   }: { map: MapState, cb: () => void }, {dispatch, getState, rejectWithValue}) => {
    try {
        const {user} = getState()
        await mapsApi.deleteMap({mapId: map.id, token: user.token})
        cb()
        dispatch(getMaps())
    } catch (err) {
        return rejectWithValue(handleRequestErrors(err))
    }
})


export const mapsSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        onMapEdit: (state, {payload}) => {
            state.map = {
                ...state.map,
                ...payload
            }
        },
        onMapLoad: (state, {payload}) => {
            state.map = payload
        },
        onMapReset: () => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(getMaps.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMaps.fulfilled, (state, {payload}) => {
                state.maps = payload
                state.isLoading = false
            })

        builder
            .addCase(saveMap.fulfilled, (state, {payload}) => {
                state.isMapEdit = false
                state.isSaveLoading = false
                message.success(payload?.id ? "Map edited successfully" : "Map created successfully")
            })
            .addCase(saveMap.pending, (state) => {
                state.isSaveLoading = true
            })
            .addCase(saveMap.rejected, (state, {payload}) => {
                state.isSaveLoading = false
                message.error(payload as string)
            })

        builder
            .addCase(deleteMap.fulfilled, (state) => {
                delete state.map.id
                state.map.name = ''
                state.isDeleteLoading = false
                message.success("Map removed successfully")
            })
            .addCase(deleteMap.pending, (state) => {
                state.isDeleteLoading = true
            })
            .addCase(deleteMap.rejected, (state, {payload}) => {
                state.isDeleteLoading = false
                message.error(payload as string)
            })

    }
})

export const {onMapEdit, onMapLoad, onMapReset} = mapsSlice.actions
export const selectMaps = (state: { maps: MapsState }) => state.maps

export const mapsActions = {
    getMaps,
    saveMap,
    deleteMap
}

export default mapsSlice.reducer