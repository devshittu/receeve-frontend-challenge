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
    accountLoading: boolean = true

    @Mutation
    setAccounts(accounts: AccountDataModel[]) {
        this.allAccounts = accounts
        setTimeout(() => {this.accountLoading = false}, 1000);

    }

    @Action({commit: 'setAccounts'})
    async fetchAllAccounts(){
        return await api.getAccounts()
    }
}

export default getModule(AccountsModule)