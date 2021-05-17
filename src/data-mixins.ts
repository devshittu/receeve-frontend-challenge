import Vue from "vue";
import Component  from "vue-class-component";
import account from "@/store/modules/accounts";
import claim from "@/store/modules/claims";
import {AccountDataModel, ClaimDataModel} from "@/store/models";
@Component
export default class DataMixins extends Vue {
    accounts: AccountDataModel[] | null = null
    claims: ClaimDataModel[] = []
    allClaims: ClaimDataModel[] = []

    get getAllClaims(): ClaimDataModel[] {
        // const { name, ingredients, steps } = this.recipe;
        return this.allClaims
    }

    mounted(): void {
        account.fetchAllAccounts().then(() => {
            this.accounts = account.allAccounts
        })

        claim.fetchAllClaims().then(() => {
            this.allClaims = claim.allClaims
                claim.allClaims.find(x => {
                if (x.accountId === this.$route.params.accountId) {
                    this.claims.push(x)
                } else return null
            })
        })

    }
}
