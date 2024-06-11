import { Component } from '@angular/core';
import { Router } from '@angular/router';

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


  constructor( private router: Router) { }

  ngOnInit(): void {
    sessionStorage.setItem('username','Cindy K');
    sessionStorage.setItem('permission','ADMIN');
    // sessionStorage.setItem('username','BANK ADMIN');
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  // login() {
  //   this.loading = true;
  //   const encryptStaffNo = this.encryptionService.encrypt(this.staffNo);
  //   const encryptedPassword = this.encryptionService.encrypt(this.password);
  //   const body = {
  //     requestId: 'Req1234567',
  //     channelName: 'USSD',
  //     timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
  //     partnerId: 'VYS2024',
  //     additionalData: {
  //       staffNo: encryptStaffNo,
  //       password: encryptedPassword
  //     }
  //   };

  //   this.loginService.login(body).subscribe(response => {
  //     if (response.statusCode === '00') {
  //       // Store additional data
  //       const additionalData = response.additionalData;
  //       sessionStorage.setItem('additionalData', JSON.stringify(additionalData));

  //       // Show success Toastr message
  //       this.toastr.success(response.statusMessage, 'Login Successful');

  //       // Redirect to dashboard page
  //       this.router.navigate(['',{ outlets: { primary: 'dashboard', outlet1:null } }]);
  //       this.loading = false;
  //     } else {
  //       // Show error Toastr message
  //       this.toastr.error(response.statusMessage, 'Login Failed');
  //       this.loading = false;
  //       sessionStorage.clear();
  //     }
  //   }, error => {
  //     this.toastr.error(error.error.statusMessage, 'Server Error');
  //     this.loading = false;
  //     sessionStorage.clear();
  //   });
  // }
}




