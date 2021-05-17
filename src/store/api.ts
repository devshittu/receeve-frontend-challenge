import axios from "axios";
import {AccountResponse, ClaimResponse} from './models'

export const receeveApi = axios.create({
    baseURL: 'http://localhost:9001'
})

export async function getAccounts(): Promise<AccountResponse | undefined>{
    try {
        const response = await receeveApi.get('/accounts')
        return response.data as AccountResponse;
    } catch (e){
        console.error(e)
    }
}
export async function getClaims(): Promise<ClaimResponse | undefined>{
    try {
        const response = await receeveApi.get('/claims')
        return response.data as ClaimResponse;
    } catch (e){
        console.error(e)
    }
}