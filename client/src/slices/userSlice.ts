import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {authApi, UserInterface} from "../services/auth-api";
import {message} from "antd";
import axios from "axios";
import {onMapReset} from "./mapsSlice";
import {onPickReset} from "./picksSlice";
import {onGeneralReset} from "./generalSlice";
import handleRequestErrors from "../utils/handleRequestErrors";


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
        return await authApi.signIn(user)
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data)
        }
        return err
    }
})

export const signUp = createAsyncThunk('user/signUp', async (user: UserInterface, {rejectWithValue}) => {
    try {
        return await authApi.signUp(user)
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

export const checkUser = createAsyncThunk('user/check', async (_, {getState, dispatch, rejectWithValue}) => {
    try {
        const {user} = getState()
        await authApi.checkUser(user.token)
    } catch (err) {
        if (axios.isAxiosError(err)) {
            dispatch(userActions.signOut())
            return rejectWithValue(handleRequestErrors(err))
        }
    }
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

        builder.addCase(checkUser.fulfilled, (state, {payload}) => {
            state.isLoading = false
        })
            .addCase(checkUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(checkUser.rejected, (state, {payload}) => {
                state.isLoading = false
                message.error(payload as string)
            })
    }
})

export const {onUserReset} = userSlice.actions
export const selectUser = (state: { user: UserState }) => state.user

export const userActions = {
    checkUser,
    signIn,
    signUp,
    signOut
}

export default userSlice.reducer