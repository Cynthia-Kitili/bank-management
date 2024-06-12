import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { Auth, BankAdmin } from '../models/sheet.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: BankAdmin | null = null;

  constructor(private http: HttpClient) {}

  login(auth: Auth): Observable<BankAdmin | null> {
    return this.http.get<BankAdmin[]>(`${environment.USERCONNECTION_URL}?email=${auth.email}`).pipe(
      map(users => {
        const user = users.find(u => {
          return u.email === auth.email && u.password === auth.password && u.status === '1';
        });
        if (user) {
          this.currentUser = user;
          return user;
        }
        return null;
      })
    );
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): BankAdmin | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  changePassword(userId: string, newPassword: string): Observable<any> {
    return this.http.get<BankAdmin>(`${environment.USERCONNECTION_URL}/${userId}`).pipe(
      switchMap(user => {
        if (user) {
          user.password = newPassword;
          user.firstTimeLogin = false;
          console.log('Updating user:', user);
          return this.http.put<BankAdmin>(`${environment.USERCONNECTION_URL}/${userId}`, user);
        } else {
          return of(null);
        }
      })
    );
  }
}

