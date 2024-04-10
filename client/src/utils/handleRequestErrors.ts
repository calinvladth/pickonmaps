import axios from "axios";

function handleRequestErrors(err: unknown) {
    if (axios.isAxiosError(err)) {
        return JSON.stringify(err.response?.data)
    }

    return JSON.stringify(err)
}

export default handleRequestErrors