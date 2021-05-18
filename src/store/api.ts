import axios from "axios";
import {AccountDataModel, AccountResponse, ClaimResponse, UserSignInSubmit} from './models'

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
export async function searchAccount(searchKeyword: string): Promise<AccountResponse | undefined>{
    try {
        const response = await receeveApi.get('/accounts?', {params: {
            q: searchKeyword
            }})
        return response.data as AccountResponse;
    } catch (e){
        console.error(e)
    }
}
export async function getSingleAccount(accountId: string): Promise<AccountDataModel | undefined>{
    try {
        const response = await receeveApi.get(`/accounts/${accountId}`)
        return response.data as AccountDataModel;
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
export async function getAnAccountClaims(accountId: string): Promise<ClaimResponse | undefined>{
    try {
        const response = await receeveApi.get(`/claims?accountId=${accountId}`)
        return response.data as ClaimResponse;
    } catch (e){
        console.error(e)
    }
}
export async function signInUser(userData: UserSignInSubmit): Promise<ClaimResponse | undefined>{
    if (userData.email === '')
    try {
        const response = await receeveApi.get('/user')
        return response.data as ClaimResponse;
    } catch (e){
        console.error(e)
    }
}