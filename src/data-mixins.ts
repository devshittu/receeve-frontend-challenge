import Vue from "vue";
import Component  from "vue-class-component";
import account from "@/store/modules/accounts";
import claim from "@/store/modules/claims";
import {AccountDataModel, ClaimDataModel, ClaimResponse} from "@/store/models";
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
        if (accountId) {
            this.getSingleAccountClaims(accountId).then(() => {
                this.claims = claim.accountClaims
            });
        }
    }

    getSingleAccountClaims(accountId: string): Promise<ClaimResponse | undefined> {
        return claim.fetchAllAccountClaims(accountId)
    }
    getSingleAccount(accountId: string): Promise<ClaimResponse | undefined> {
        return claim.fetchAllAccountClaims(accountId)
    }

    created(): void {
        this.initializeAppData();

    }

}
