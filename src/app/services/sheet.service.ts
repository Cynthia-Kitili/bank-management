import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bank, BankAdmin, Customers } from '../models/sheet.model';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  constructor(private http: HttpClient) { }

  createBankSheet(code: any, name: any, branch: any, address: any, customers: any, contact: any, status: any,): Observable<Bank> {
    return this.http.post<Bank>(`${environment.CONNECTION_URL}`,
      { code, name, branch, address, customers, contact, status, });
  }

  listBankSheet() {
    return this.http.get(`${environment.CONNECTION_URL}`);
  }

  deleteBankSheet(code: any) {
    return this.http.delete(`${environment.CONNECTION_URL}/${code}`);
  }

  getBankSheetDataById(code: string): Observable<any> {
    return this.http.get<any>(`${environment.CONNECTION_URL}?bankCode=${code}`).pipe(
      catchError(error => {
        console.error('API error:', error);
        return of([]);
      })
    );
  }

  updateBankSheet(id: any, code: any, name: any, branch: any, address: any, customers: any, contact: any, status: any,): Observable<Bank> {
    return this.http.put<Bank>(`${environment.CONNECTION_URL}/${id}`,
      { code, name, branch, address, customers, contact, status, });
  }

  createUserSheet(uniqueid: any, name: any,email: any, password: any,role: any, status: any,firstTimeLogin:any, bankCode:any, bankName:any): Observable<BankAdmin> {
    return this.http.post<BankAdmin>(`${environment.USERCONNECTION_URL}`,
      { uniqueid, name,email, password,role, status,firstTimeLogin, bankCode, bankName  });
  }

  listUserSheet() {
    return this.http.get(`${environment.USERCONNECTION_URL}`);
  }

  deleteUserSheet(code: any) {
    return this.http.delete(`${environment.USERCONNECTION_URL}/${code}`);
  }

  getUserSheetDataById(id: number, ) {
    return this.http.get(`${environment.USERCONNECTION_URL}/${id}`);
  }

  updateUserSheet(id: any, uniqueid: any, name: any,email: any, password: any,role: any, status: any,firstTimeLogin:any, bankCode:any, bankName:any): Observable<BankAdmin> {
    return this.http.put<BankAdmin>(`${environment.USERCONNECTION_URL}/${id}`,
      { uniqueid, name,email, password,role, status,firstTimeLogin, bankCode, bankName });
  }


  createCustomerSheet(uniqueid: any, name: any,email: any, gender: any,accountNumber: any, loanAmount: any,accountBalance:any,bankCode:any, bankName:any): Observable<Customers> {
    return this.http.post<Customers>(`${environment.CUSTOMERCONNECTION_URL}`,
      { uniqueid, name,email, gender,accountNumber, loanAmount,accountBalance,bankCode,bankName});
  }

  listCustomerSheet() {
    return this.http.get(`${environment.CUSTOMERCONNECTION_URL}`);
  }

  deleteCustomerSheet(code: any) {
    return this.http.delete(`${environment.CUSTOMERCONNECTION_URL}/${code}`);
  }

  getCustomerSheetDataById(id: number, ) {
    return this.http.get(`${environment.CUSTOMERCONNECTION_URL}/${id}`);
  }

  updateCustomerSheet(id: any, uniqueid: any, name: any,email: any, gender: any,accountNumber: any, loanAmount: any,accountBalance:any,bankCode:any, bankName:any): Observable<Customers> {
    return this.http.put<Customers>(`${environment.CUSTOMERCONNECTION_URL}/${id}`,
      {uniqueid, name,email, gender,accountNumber, loanAmount,accountBalance,bankCode,bankName });
  }
}

