import axios from "axios";
import {API} from "../utils/constants";

export interface UserInterface {
    username: string,
    password: string
}

async function checkUser(token: string) {
    const response = await axios.get(`${API}/customer/check`, {headers: {
            'Bearer': token
        }})
    return response.data
}

async function signIn(user: UserInterface) {
    const response = await axios.post(`${API}/customer/auth/signin`, user)
    return response.data
}

async function signUp(user: UserInterface) {
    const response = await axios.post(`${API}/customer/auth/signup`, user)
    return response.data
}

export const authApi = {
    checkUser,
    signIn,
    signUp
}