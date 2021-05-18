import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import store from '@/store'
import {AccountDataModel} from "@/store/models";
import * as api from "@/store/api";


@Module({
    dynamic: true,
    namespaced: true,
    name: 'accounts',
    store
})

class AccountsModule extends  VuexModule{
    allAccounts: AccountDataModel[] = []
    singleAccount?: AccountDataModel | null = null;
    accountLoading: boolean = true

    @Mutation
    setAccounts(accounts: AccountDataModel[]) {
        this.allAccounts = accounts
        setTimeout(() => {this.accountLoading = false}, 200);

    }

    @Action({commit: 'setAccounts'})
    async fetchAllAccounts(){
        return await api.getAccounts()
    }

    @Mutation
    setSingleAccountInfo(model: AccountDataModel) {
        this.singleAccount = model
    }
    @Action({commit: 'setSingleAccountInfo'})
    async fetchSingleAccountInfo(accountId: string){
        return await api.getSingleAccount(accountId)
    }
}

export default getModule(AccountsModule)