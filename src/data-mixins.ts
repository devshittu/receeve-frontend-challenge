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
        return this.allClaims
    }

    initializeAppData() {
        account.fetchAllAccounts().then(() => {
            this.accounts = account.allAccounts
        })

        claim.fetchAllClaims().then(() => {
            this.allClaims = claim.allClaims
            // claim.allClaims.find(x => {
            //     if (x.accountId === this.$route.params.accountId) {
            //         this.claims.push(x)
            //     } else return null
            // })
        })
        const accountId: string | undefined = this.$route.params.accountId;
        // console.log(`Type of account Id`, (typeof accountId), (typeof accountId) === `string`)
        if (accountId) {
            claim.fetchAllAccountClaims(accountId).then(() => {
                this.claims = claim.accountClaims
            })
        }
    }
    mounted(): void {
        this.initializeAppData();

    }

}
