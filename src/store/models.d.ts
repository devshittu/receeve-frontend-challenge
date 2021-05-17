


export interface AccountDataModel {
    id: string;
    debtor: DebtorDataModel;
}
export interface DebtorDataModel {
    title?: string | null;
    firstName: string;
    lastName: string;
    address: AddressDataModel;
    mobilePhone: string;
    email: string;
}
export interface AddressDataModel {
    address: string;
    city: string;
    state: string;
    zip: number;
    country: string;
}



export interface ClaimDataModel {
    id: string;
    accountId: string;
    currency: string;
    baseAmount: number;
    fees: number;
    dueDate: string;
    status: string;
    paidAt?: string | null;
    deletedAt?: string | null;
}


export interface AccountResponse {
    accounts: AccountDataModel[] | null
}
export interface ClaimResponse {
    claims: ClaimDataModel[] | null
}

export interface Accounts {
    accounts?: (AccountDataModel)[] | null;
    claims?: (ClaimDataModel)[] | null;
}