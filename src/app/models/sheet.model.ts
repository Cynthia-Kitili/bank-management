export interface Bank {
    code: any;
    name: any;
    branch: any;
    address: any;
    customers: any;
    contact: any;
    status: any;
}

export interface BankAdmin {
    uniqueid: string;
    name: string;
    email: string;
    password: string;
    role: string;
    status: string;
    firstTimeLogin: boolean;
    bankCode: any;
    bankName: any;
}
export interface Auth {
    email: string;
    password: string;
  }