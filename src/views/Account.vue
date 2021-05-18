<template>
  <div>

    <section class="hero ">
      <div class="hero-body px-0">

        <p class="title">
          <span>Account List</span>
        </p>
        <p class="subtitle pt-5">
          <span>The following table shows the list of debtor accounts.
            <br><em>Click the more button to show brief info about the account</em>
            <br><em>To use the search box, enter a keyword such as: Missouri, Spencer, or anything you can remember about the desired account(s). Then click the blue search button to begin.</em></span>
        </p>
      </div>
    </section>
    <section>
      <b-field grouped group-multiline>


        <b-field position="is-centered">
          <b-input placeholder="Search..." v-model="searchString" type="search" icon-pack="fas" icon="search" size="is-medium">
          </b-input>
          <p class="control">
            <b-button label="Search" type="is-info" @click="searchAccounts" size="is-medium" />
          </p>
        </b-field>

        <b-select v-model="perPage" :disabled="!isPaginated" size="is-medium">
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="15">15 per page</option>
          <option value="20">20 per page</option>
        </b-select>
        <div class="control is-flex">
          <b-switch v-model="isPaginated" type="is-info" size="is-medium">Paginated</b-switch>
        </div>
        <div class="control is-flex">
          <b-switch v-model="isPaginationSimple" :disabled="!isPaginated" type="is-info" size="is-medium">Simple pagination</b-switch>
        </div>

      </b-field>
      <hr>

      <b-table
          :data="loadedAccounts"
          :paginated="isPaginated"
          :per-page="perPage"
          :pagination-simple="isPaginationSimple"
          ref="accountTable"
          detailed
          detail-key="id"
          detail-transition="fade"
          :show-detail-icon="false"
          :opened-detailed="[1]"

          type="is-info"

          default-sort="user.fullName"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          icon-pack="fas">



        <b-table-column field="debtor.fullName" label="Name" sortable v-slot="props">

          <router-link :to="'/accounts/'+props.row.id+'/details'" class="is-text">
            {{ props.row.debtor.title !== null ? props.row.debtor.title : '' }}
          {{ props.row.debtor.firstName + ' ' + props.row.debtor.lastName }}
          </router-link>
        </b-table-column>

        <b-table-column field="debtor.email" label="Email" sortable v-slot="props">
          {{ props.row.debtor.email }}
        </b-table-column>

        <b-table-column field="debtor.mobilePhone" label="Phone" sortable v-slot="props">
          {{ props.row.debtor.mobilePhone }}
        </b-table-column>

        <b-table-column field="viewMore" label="Action" sortable centered v-slot="props">

          <b-button type="is-info is-light"  class="button is-link is-outlined"
             @click="toggleAccountDetailsInTable(props.row)">
            <b-icon
                pack="fas"
                icon="chevron-down">
            </b-icon>
            <span>More</span>
          </b-button>
        </b-table-column>


        <template #detail="props">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img id="company-logo" alt="Vue logo" src="@/assets/logo.png">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>
                    {{ props.row.debtor.title !== null ? props.row.debtor.title : '' }}
                    {{ props.row.debtor.firstName + ' ' + props.row.debtor.lastName }}</strong>
                  <br>

                  <strong>Account Claims:</strong> <span>{{ props.row.debtor.totalClaims !== null ? props.row.debtor.totalClaims : '' }}</span> <br>
                  <strong>Address:</strong> <span>{{ props.row.debtor.address.address }}</span> <br>
                  <strong>City:</strong> <span>{{ props.row.debtor.address.city }}</span> <br>
                  <strong>State:</strong>
                  <span>{{ props.row.debtor.address.state }} ({{ props.row.debtor.address.zip }})</span> <br>
                  <strong>Country:</strong> <span>{{ props.row.debtor.address.country }}</span> <br>

                  <br>
                  <span> See {{ props.row.debtor.firstName }}'s claims history and records
                  <router-link :to="'/accounts/'+props.row.id+'/details'" class="is-text">

                    <span>here &raquo;</span>
                  </router-link>
              </span>
                </p>
              </div>
            </div>
          </article>
        </template>

      </b-table>
    </section>
  </div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import account from '@/store/modules/accounts'
import {AccountDataModel} from "@/store/models";
import {mixins} from "vue-class-component";
import DataMixins from "@/data-mixins";
import claims from "@/store/modules/claims";

@Component
export default class Account extends mixins(DataMixins) {
  accounts: AccountDataModel[] = [];
  // loadedAccounts: AccountDataModel[] = [];
  // old accounts: AccountDataModel[] = [];
  populateAccount : AccountDataModel[] = [];
  searchedAccounts: AccountDataModel[] = [];
  isPaginated = true;
  isPaginationSimple = false;
  sortIconSize = 'is-small';
  // currentPage = 1;
  perPage = 20
  searchString: string = ''

  searchAccounts(){
    if (this.searchString !== '' && this.searchString.length > 0){
      // search logic here.
      //TODO: Use debounce in case of typeahead or auto-loading
      console.log('')
      account.searchAccounts(this.searchString).then(()=>{
        this.searchedAccounts = account.searchedAccounts
        console.log(`Searched Accounts`, this.searchedAccounts)
      })

    }
  }

  get loadedAccounts(){
    if (this.searchString !== '' && this.searchString.length > 0){
      return this.searchedAccounts
    } else return this.accounts
  }
  set loadedAccounts(value: AccountDataModel[]){
    if (this.searchString !== '' && this.searchString.length > 0){
      this.searchedAccounts = value
    }
  }

  toggleAccountDetailsInTable(row: AccountDataModel) {
    console.log('get the total number of claims for the account', row, typeof row)
    this.getSingleAccountClaims(row.id).then(() => {
      this.claims = claims.accountClaims
      row.debtor["totalClaims"] = this.claims.length
    });
    setTimeout(() => {
      // @ts-ignore
      this.$refs.accountTable.toggleDetails(row)
    }, 200);
  }

  created(): void {
    account.fetchAllAccounts().then(() => {
      this.accounts = account.allAccounts
      this.loadedAccounts = account.allAccounts
    })

  }
}
</script>

<style scoped>

</style>