import axios from "axios";

function handleRequestErrors(err: unknown) {
    if (axios.isAxiosError(err)) {
        return err.response?.data
    }
    return err
}

export default handleRequestErrors