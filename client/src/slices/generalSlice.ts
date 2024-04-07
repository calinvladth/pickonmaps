import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {mapsApi} from "../services/maps-api";
import {onMapLoad, onMapReset} from "./mapsSlice";
import {onPickLoad, onPickReset} from "./picksSlice";
import {picksApi} from "../services/picks-api";


export interface GeneralState {
    markerPosition: { lat: number, lng: number },
    currentUserPosition: { lat: number, lng: number }
    isLoading: boolean,
    isEditView: boolean,
    isMapLoading: boolean,
    isPickLoading: boolean
}

const initialState: GeneralState = {
    markerPosition: {
        lat: 0,
        lng: 0
    },
    currentUserPosition: {
        lat: 0,
        lng: 0
    },
    isLoading: false,
    isEditView: false,
    isMapLoading: false,
    isPickLoading: false
}

export const getMap = createAsyncThunk('general/getMap', async (mapId: string, {dispatch}) => {
    const response = await mapsApi.getMap(mapId)
    dispatch(onMapLoad(response))
    return response
})

export const getPick = createAsyncThunk('general/getPick', async ({
                                                                      mapId,
                                                                      pickId
                                                                  }: { mapId: string, pickId: string }, {dispatch}) => {
    const response = await picksApi.getPick({mapId, pickId})
    dispatch(onPickLoad(response))
    return response
})

export const onCreate = createAsyncThunk('general/onCreate', async (isEditView: boolean, {dispatch}) => {
    dispatch(onEdit(isEditView))
    dispatch(onMapReset())
    dispatch(onPickReset())
})

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        onMapMove: (state, {payload}) => {
            state.markerPosition.lat = payload?.lat
            state.markerPosition.lng = payload?.lng
        },
        onEdit: (state, {payload}) => {
            state.isEditView = payload
        },
        onMarkerDrag: (state, {payload}) => {
            state.markerPosition = payload
        },
        onCurrentLocation: (state, {payload}) => {
            state.currentUserPosition.lat = payload.lat
            state.currentUserPosition.lng = payload.lng
        },
        onReset: (state) => {
            state.markerPosition = {
                lat: 0,
                lng: 0
            }
            state.isEditView = false
            state.isMapLoading = false
        }
    },
    extraReducers: builder => {
        builder.addCase(getMap.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.markerPosition = {
                lat: payload.lat,
                lng: payload.lng
            }
        })
            .addCase(getMap.pending, (state) => {
                state.isLoading = true
            })

        builder.addCase(getPick.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.markerPosition = {
                lat: payload.lat,
                lng: payload.lng
            }
        })
            .addCase(getPick.pending, (state) => {
                state.isLoading = true
            })
    }
})

export const {onMapMove, onEdit, onMarkerDrag, onCurrentLocation, onReset} = generalSlice.actions
export const selectGeneral = (state: { general: GeneralState }) => state.general

export const generalActions = {
    getMap,
    getPick,
    onCreate
}

export default generalSlice.reducer