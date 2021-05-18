import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ClaimDataModel, UserDataModel} from "@/store/models";
import * as api from "@/store/api";


@Module({
    dynamic: true,
    namespaced: true,
    name: 'claims',
    store
})

class UsersModule extends  VuexModule{
    user?: UserDataModel | null = null;

    @Mutation
    setAllClaims(user: UserDataModel) {
        this.user = user
    }
    @Action({commit: 'setAllClaims'})
    async fetchAllClaims(){
        return await api.getClaims()
    }
}

export default getModule(UsersModule)