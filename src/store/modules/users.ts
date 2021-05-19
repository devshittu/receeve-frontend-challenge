import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {AuthInfo, UserDataModel, UserSignInSubmit} from "@/store/models";
import * as api from "@/store/api";
import {destroyToken, getToken, saveToken} from "@/plugin/jwt.service";


@Module({
    dynamic: true,
    namespaced: true,
    name: 'users',
    store
})

class UsersModule extends  VuexModule{
    user?: UserDataModel | null = null;
    isAuthenticated?: boolean  = false;

    @Mutation
    checkAuth(): boolean {
        const authData: AuthInfo | null = getToken();
        // check the local storage for token exist
        if (authData.token){
            // fire another call
            this.isAuthenticated = true
            if (typeof authData.user === "string") {
                this.user = JSON.parse(authData.user)
            }
            // return this.getUser();
            return true
        } else {
            return false
        }

    }
    @Mutation
    signOut(): boolean {
        this.isAuthenticated = false
        this.user = null
        destroyToken()
        return true
    }

    @Mutation
    setUser(user: UserDataModel) {
        saveToken({token: user.token, user: JSON.stringify(user)})
        this.isAuthenticated = !!user
        this.user = user
    }
    @Action({commit: 'setUser', rawError: true})
    async signIn(params: UserSignInSubmit){
        return await api.signInUser(params)
    }
    @Action({commit: 'setUser'})
    async getUser(){
        console.log(`getUser fired`)
        return await api.getAdminUser()
    }
}

export default getModule(UsersModule)