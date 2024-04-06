import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {mapsApi} from "../services/maps-api";
import {onMapLoad, onReset} from "./mapsSlice";


export interface GeneralState {
    markerPosition: { lat: number, lng: number },
    isEditView: boolean,
    isMapLoading: boolean
}

const initialState: GeneralState = {
    markerPosition: {
        lat: 0,
        lng: 0
    },
    isEditView: false,
    isMapLoading: false
}

export const getMap = createAsyncThunk('general/getMap', async (mapId: string, {dispatch}) => {
    const response = await mapsApi.getMap(mapId)
    dispatch(onMapLoad(response))
    return response
})

export const onCreate = createAsyncThunk('general/onCreate', async (isEditView: boolean, {dispatch}) => {
    dispatch(onEdit(isEditView))
    dispatch(onReset())
})


export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        onMapMove: (state, action) => {
            if (!state.markerPosition.lat && !state.markerPosition.lng) {
                state.markerPosition.lat = action.payload?.lat
                state.markerPosition.lng = action.payload?.lng
            }
        },
        onEdit: (state, action) => {
            state.isEditView = action.payload
            state.markerPosition.lat = 0
            state.markerPosition.lng = 0
        },
        onMarkerDrag: (state, action) => {
            state.markerPosition = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getMap.fulfilled, (state, {payload}) => {
            state.isMapLoading = false
            state.markerPosition = {
                lat: payload.lat,
                lng: payload.lng
            }
        })
            .addCase(getMap.pending, (state) => {
                state.isMapLoading = true
            })
    }
})

export const {onMapMove, onEdit, onMarkerDrag} = generalSlice.actions
export const selectGeneral = (state: { general: GeneralState }) => state.general

export const generalActions = {
    getMap,
    onCreate
}

export default generalSlice.reducer