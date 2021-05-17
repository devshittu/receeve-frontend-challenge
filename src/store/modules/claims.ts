import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ClaimDataModel} from "@/store/models";
import * as api from "@/store/api";


@Module({
    dynamic: true,
    namespaced: true,
    name: 'claims',
    store
})

class ClaimsModule extends  VuexModule{
    allClaims: ClaimDataModel[] = [];
    // allAccountClaims: ClaimDataModel[] = [];

    @Mutation
    setAllClaims(claims: ClaimDataModel[]) {
        this.allClaims = claims
    }
    @Action({commit: 'setAllClaims'})
    async fetchAllClaims(){
        return await api.getClaims()
    }
}

export default getModule(ClaimsModule)