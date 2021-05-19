import {AuthInfo} from "@/store/models";

export const ID_TOKEN_KEY = "id_token"
export const USER_INFO = "user_info"

export const getToken = (): AuthInfo => {
    return {
        token: window.localStorage.getItem(ID_TOKEN_KEY),
        user: window.localStorage.getItem(USER_INFO),
    };
};
// export const getUserInLS = () => {
//     return window.localStorage.getItem(USER_INFO)
// };

export const saveToken = (obj: AuthInfo) => {
    // console.log('typeof obj.user ', typeof obj.user )
    if (typeof obj.token === "string" && typeof obj.user === "string") {
        window.localStorage.setItem(ID_TOKEN_KEY, obj.token)
        window.localStorage.setItem(USER_INFO, obj.user)
        return true
    } else return false;
};

export const destroyToken = () => {
    window.localStorage.removeItem((ID_TOKEN_KEY))
    window.localStorage.removeItem((USER_INFO))
};

export default {ID_TOKEN_KEY, getToken, saveToken, destroyToken};