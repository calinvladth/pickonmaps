import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {mapsApi} from "../services/maps-api";
import {onMapLoad, onMapReset} from "./mapsSlice";
import {onPickLoad, onPickReset} from "./picksSlice";
import {picksApi} from "../services/picks-api";
import handleRequestErrors from "../utils/handleRequestErrors";
import {MAP_ZOOM} from "../utils/constants";

export interface PositionInterface {
    lat: number,
    lng: number
}

export interface GeneralState {
    markerPosition: PositionInterface,
    currentUserPosition: PositionInterface
    mapZoom: number,
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
    mapZoom: MAP_ZOOM,
    isLoading: false,
    isEditView: false,
    isMapLoading: false,
    isPickLoading: false
}

// TODO: Move to maps
export const getMap = createAsyncThunk('general/getMap', async (mapId: string, {
    getState,
    dispatch,
    rejectWithValue
}) => {
    try {
        const {user, maps} = getState()
        const response = await mapsApi.getMap({mapId, token: user.token})
        dispatch(onMapLoad(response))

        return {data: response, map: maps.map}
    } catch (err) {
        return rejectWithValue(handleRequestErrors(err))
    }

})

// TODO: Move to picks
export const getPick = createAsyncThunk('general/getPick', async ({
                                                                      mapId,
                                                                      pickId
                                                                  }: { mapId: string, pickId: string }, {
                                                                      dispatch,
                                                                      rejectWithValue
                                                                  }) => {
    try {
        const response = await picksApi.getPick({mapId, pickId})
        dispatch(onPickLoad(response))
        return response
    } catch (err) {
        return rejectWithValue(handleRequestErrors(err))
    }

})

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        onMapZoom: (state, {payload}) => {
            state.mapZoom = payload
        },
        onCurrentLocation: (state, {payload}) => {
            state.currentUserPosition = payload
        },
        onPositionChange: (state, {payload}) => {
            state.markerPosition = payload
        },
        onEdit: (state, {payload}) => {
            state.isEditView = payload
        },
        onGeneralReset: (state) => {
            state.isEditView = false
            state.isMapLoading = false
        }
    },
    extraReducers: builder => {
        builder.addCase(getMap.fulfilled, (state, {payload}) => {
            const {data, map} = payload
            state.isLoading = false

            if (!map.id) {
                state.markerPosition = {
                    lat: data.lat,
                    lng: data.lng
                }
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

export const {
    onMapZoom,
    onEdit,
    onCurrentLocation,
    onGeneralReset,
    onPositionChange
} = generalSlice.actions
export const selectGeneral = (state: { general: GeneralState }) => state.general

export const generalActions = {
    getMap,
    getPick,
}

export default generalSlice.reducer