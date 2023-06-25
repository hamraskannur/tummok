import {Api} from "../utils/api"

export async function registerUser(credentials) {
    try {
        const { data } = await Api.post(`/register`, credentials, { withCredentials: true })
        return data
    } catch (error) {
        return { error: 'Cannot find the User' }
    }
};

export async function userLogin(credentials) {
    try {
        const { data } = await Api.post(`/login`, credentials, { withCredentials: true })

        return data
    } catch (error) {
        return { error: 'login failed' }
    }
};

export async function Auth() {
    try {
        const { data } = await Api.post(`/authenticate`, { withCredentials: true })

        return data
    } catch (error) {
        console.log(error);
        return { error: 'Data Fetch error' }
    }
};


