import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {message} from "antd";
import {mapsApi} from "../services/maps-api";

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

export const getMaps = createAsyncThunk('map/getMaps', async () => {
    return await mapsApi.getMaps()
})

export const saveMap = createAsyncThunk('map/createMap', async ({map, cb}: {map: MapState, cb: () => void}, {dispatch}) => {
    map.id ? await mapsApi.editMap(map) : await mapsApi.createMap(map)
    dispatch(getMaps())
    cb()

    message.success(map.id ? "Map edited successfully" : "Map created successfully")
})

export const deleteMap = createAsyncThunk('map/deletePick', async ({
                                                                       map,
                                                                       cb
                                                                   }: { map: MapState, cb: () => void }, {dispatch}) => {
    await mapsApi.deleteMap(map)
    cb()
    dispatch(getMaps())

    message.success("Map removed successfully")
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
        onReset: () => {
            return initialState
        }
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
            .addCase(saveMap.fulfilled, (state) => {
                // delete state.pick.id
                // state.pick.category = ''
                // state.pick.name = ''
                // state.pick.lat = 0
                // state.pick.lng = 0

                state.isMapEdit = false
                state.isSaveLoading = false
            })

        builder
            .addCase(saveMap.pending, (state) => {
                state.isSaveLoading = true
            })

        builder
            .addCase(deleteMap.fulfilled, (state) => {
                delete state.map.id
                state.map.name = ''
                state.isDeleteLoading = false
            })
            .addCase(deleteMap.pending, (state) => {
                state.isDeleteLoading = true
            })

    }
})

export const {onMapEdit, onMapLoad, onReset} = mapsSlice.actions
export const selectMaps = (state: { maps: MapsState }) => state.maps

export const mapsActions = {
    getMaps,
    saveMap,
    deleteMap
}

export default mapsSlice.reducer