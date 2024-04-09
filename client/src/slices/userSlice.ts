import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {authApi, UserInterface} from "../services/auth-api";
import {message} from "antd";
import axios from "axios";
import {onMapReset} from "./mapsSlice";
import {onPickReset} from "./picksSlice";
import {onGeneralReset} from "./generalSlice";


export interface UserState {
    token: string,
    username: string,
    email: string
    isLoading: boolean,
    isAuthenticated: boolean
}

const initialState: UserState = {
    token: '',
    username: '',
    email: '',
    isLoading: false,
    isAuthenticated: false
}

export const signIn = createAsyncThunk('user/signIn', async (user: UserInterface, {rejectWithValue}) => {
    try {
        const response = await authApi.signIn(user)
        return response
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data)
        }
        return err
    }
})

export const signUp = createAsyncThunk('user/signUp', async (user: UserInterface, {rejectWithValue}) => {
    try {
        const response = await authApi.signUp(user)
        return response
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data)
        }
        return err
    }
})

export const signOut = createAsyncThunk('user/signOut', async (_, {dispatch}) => {
    dispatch(onUserReset())
    dispatch(onGeneralReset())
    dispatch(onMapReset())
    dispatch(onPickReset())
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onUserReset: () => initialState
    },
    extraReducers: builder => {
        builder.addCase(signIn.fulfilled, (state, {payload}) => {
            state.token = payload.token
            state.email = payload.email
            state.isAuthenticated = true
            state.isLoading = false
        })
            .addCase(signIn.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signIn.rejected, (state, {payload}) => {
                state.isLoading = false
                state.isAuthenticated = false
                message.error(payload as string)
            })

        builder.addCase(signUp.fulfilled, (state, {payload}) => {
            state.token = payload.token
            state.email = payload.email
            state.isAuthenticated = true
            state.isLoading = false
        })
            .addCase(signUp.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signUp.rejected, (state, {payload}) => {
                state.isLoading = false
                state.isAuthenticated = false
                message.error(payload as string)
            })
    }
})

export const {onUserReset} = userSlice.actions
export const selectUser = (state: { user: UserState }) => state.user

export const userActions = {
    signIn,
    signUp
}

export default userSlice.reducer