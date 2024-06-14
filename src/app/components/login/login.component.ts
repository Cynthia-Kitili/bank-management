import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/sheet.model';
import { AuthService } from 'src/app/services/auth.service';
import { SheetService } from 'src/app/services/sheet.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: any;
  password: any;
  staffNo: any;
  loading: any;
  showPassword: boolean = false;
  isLoggedIn: any;
  changePassword:any;

  changePasswordForm: FormGroup;
  userId: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sheetservice: SheetService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.changePasswordForm = this.fb.group({
      newPassword: ['', Validators.required]
    });
  }



  ngOnInit(): void {

    // sessionStorage.setItem('username','BANK ADMIN');
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  loginForm: FormGroup;



  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const auth: Auth = this.loginForm.value;
      this.authService.login(auth).subscribe(user => {
        this.loading = false;
        console.log('auth',auth)
        console.log('user',user)
        if (user) {
          if (user.firstTimeLogin === true) {
            this.changePassword = true;
          } else {
            this.router.navigate(['',{ outlets: { primary: 'dashboard', outlet1:null } }]);
            this.userId = user.uniqueid
            sessionStorage.setItem('username', user.name);
            sessionStorage.setItem('permission', user.role);
            sessionStorage.setItem('bankCode', user.bankCode);
            sessionStorage.setItem('bankName', user.bankName);
          }
        } else {
          alert('Login Error')
          this.loading = false;
        }
      });
    }
  }

  onChangePasswordSubmit(): void {
    if (this.changePasswordForm.valid) {
      this.loading = true;
      const newPassword = this.changePasswordForm.value.newPassword;
      if (this.userId) {
        // Fetch the user by ID first
        this.sheetservice.getUserSheetDataById(this.userId).subscribe(user => {
          this.loading = false;
          if (user) {
            // User found, proceed to change password
            this.authService.changePassword(this.userId, newPassword).subscribe(() => {
              
              alert('Password Changed Successfully');
              this.changePassword = false;
            });
          } else {
            alert('User not found');
          }
        }, error => {
          alert('Error fetching user');
          this.loading = false;
        });
      } else {
        alert('Password Change Error');
        this.loading = false;
      }
    } else {
      alert('Password Change Error');
      this.loading = false;
    }
  }

}




