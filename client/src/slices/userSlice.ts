import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {authApi, UserInterface} from "../services/auth-api";
import {message} from "antd";
import axios, {AxiosError} from "axios";


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
        console.log(err)
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data)
        }
        return err
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
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

// export const {} = userSlice.actions
export const selectUser = (state: { user: UserState }) => state.user

export const userActions = {
    signIn,
    signUp
}

export default userSlice.reducer