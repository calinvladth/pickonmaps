import axios from "axios";
import {API} from "../utils/constants";

export interface UserInterface {
    username: string,
    password: string
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
    signIn,
    signUp
}