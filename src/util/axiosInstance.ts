import axios from "axios";

export const fbAxiosInstance = axios.create({
    baseURL: `${process.env.BG_BASE_ENDPOINT}`,
    timeout: 1000,
    headers: {
        "Accept":"application/json",
        "authToken": `${process.env.BG_ACCESS_TOKEN}`
    }
})

export const BG_B2B_Axios_Instance = axios.create({
    baseURL: `${process.env.BG_BASE_ENDPOINT}`,
    headers: {
        "Accept":"application/json",
        "authToken": `${process.env.BG_ACCESS_TOKEN}`
    }
})

export const BG_NON_B2B_Axios_Instance = axios.create({
    baseURL: `${process.env.BG_NON_B2B_ENDPOINT}`,
    headers:{
        "Content-Type":"application/json",
        "X-Auth-Token":process.env.BG_NON_B2B_TOKEN
    }
})