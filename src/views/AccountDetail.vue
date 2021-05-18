<template>
  <div>

    <p v-if="accountLoading">Debtor Information Loading...</p>
    <article class="media" v-else>
      <figure class="media-left">
        <p class="image is-128x128">
          <img id="company-logo" alt="Vue logo" src="@/assets/logo.png">
        </p>
      </figure>

      <div class="media-content">
        <div class="content">
          <!--          {{accountDetails2.debtor}}-->
          <p>
            <strong class="title pb-1">
              {{ accountDetails.debtor.title !== null ? accountDetails.debtor.title : '' }}
              {{ accountDetails.debtor.firstName + ' ' + accountDetails.debtor.lastName }}</strong>
            <br>

            <span class="subtitle">
          <hr>

          <span class="pb-1">
                <strong>Email: </strong>{{
              accountDetails.debtor.email
            }} &nbsp; &nbsp; &nbsp;
              <br>
              <strong>Phone: </strong>{{ accountDetails.debtor.mobilePhone }}
            </span>
          </span>
          <span class="subtitle">
            <strong>Address:</strong> <span>{{ accountDetails.debtor.address.address }}</span> <br>
            <strong>City:</strong> <span>{{ accountDetails.debtor.address.city }}</span> <br>
            <strong>State:</strong>
            <span>{{ accountDetails.debtor.address.state }} ({{ accountDetails.debtor.address.zip }})</span> <br>
            <strong>Country:</strong> <span>{{ accountDetails.debtor.address.country }}</span>
            </span>

          </p>
        </div>
      </div>
    </article>
    <hr>

    <h1 class="title">Account Claims ({{ claims.length }})</h1>

    <div class="section is-paddingless">

      <b-table
          :data="claims"
          :paginated="isPaginated"
          :per-page="perPage"
          :current-page.sync="currentPage"
          :pagination-simple="isPaginationSimple"
          :pagination-position="paginationPosition"
          :default-sort-direction="defaultSortDirection"
          :pagination-rounded="isPaginationRounded"
          :sort-icon="sortIcon"
          :sort-icon-size="sortIconSize"

          type="is-info"

          default-sort="status"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          icon-pack="fas">

        <b-table-column field="desc" label="Description" sortable v-slot="props">

          <span v-if="props.row.status === 'PAID'">
            {{
              'Paid on ' + new Date(props.row.paidAt).toLocaleDateString("en-US", {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            }}
            ({{props.row.id}})
          </span>
          <span v-if="props.row.status === 'DELETED'">
            {{
              'Deleted on ' + new Date(props.row.deletedAt).toLocaleDateString("en-US", {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            }}
            ({{props.row.id}})
          </span>
          <span v-if="props.row.status === 'OPEN'">

            {{
              'Due on ' + new Date(props.row.dueDate).toLocaleDateString("en-US", {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            }}
            ({{props.row.id}})
          </span>

        </b-table-column>

        <b-table-column field="baseAmount" label="Base Amount" sortable v-slot="props">
          {{ new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'EUR'}).format(props.row.baseAmount / 100) }}
        </b-table-column>

        <b-table-column field="baseAmount" label="Fees" sortable v-slot="props">
          {{ new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'EUR'}).format(props.row.fees / 100) }}
        </b-table-column>
        <b-table-column field="Due Date" label="Due Date" sortable v-slot="props">
          {{ props.row.dueDate }}
        </b-table-column>

        <b-table-column field="status" label="Status" sortable v-slot="props">
          <b-tooltip v-if="props.row.status === 'PAID'"
                     :label="'Paid at '+  new Date(props.row.paidAt).toLocaleDateString()"
                     position="is-left" type="is-info">

            <span class="tag is-medium is-success">
            {{ props.row.status }}
                </span>
          </b-tooltip>
          <b-tooltip v-if="props.row.status === 'DELETED'"
                     :label="'Deleted on '+  new Date(props.row.deletedAt).toLocaleDateString()"
                     position="is-left" type="is-info">

            <span class="tag is-medium is-danger">{{ props.row.status }}</span>
          </b-tooltip>
          <b-tooltip v-if="props.row.status === 'OPEN'"
                     :label="'Due on '+  new Date(props.row.dueDate).toLocaleDateString()"
                     position="is-left" type="is-info">

            <span class="tag is-medium is-info">{{ props.row.status }}</span>
          </b-tooltip>


        </b-table-column>


      </b-table>
    </div>
  </div>
</template>


<script lang="ts">
import {Component} from "vue-property-decorator";
import {mixins} from "vue-class-component";

// import {AccountDataModel} from "@/store/models";
import account from "@/store/modules/accounts";
import DataMixins from "@/data-mixins";
import {AccountDataModel} from "@/store/models";

@Component
export default class AccountDetail extends mixins(DataMixins) {
  accountDetails: AccountDataModel | null | undefined = null;
  accountLoading = true;
  isPaginated = true;
  isPaginationSimple = false;
  isPaginationRounded = false;
  paginationPosition = 'bottom';
  defaultSortDirection = 'asc';
  sortIcon = 'arrow-up';
  sortIconSize = 'is-small';
  currentPage = 1;
  perPage = 20

  mounted(): void {
    account.fetchSingleAccountInfo(this.$route.params.accountId).then(() => {
      setTimeout(() => {
        this.accountDetails = account.singleAccount;
        this.accountLoading = false
      }, 20);
    })
  }
}
</script>
<style scoped>

</style>