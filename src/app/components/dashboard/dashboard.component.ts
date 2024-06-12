import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexFill, ApexLegend, ApexTitleSubtitle, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { SheetService } from 'src/app/services/sheet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = false;
  sheetResponse: any;
  sheetAdminResponse: any;
  bankCode: any;
  permission: any;
  bankdata: any;
  userdata: any;
  chartOptions: any = {
    series: [],
    chart: {
      type: 'line',
      height: 350
    },
    title: {
      text: 'Customers Per Bank',
      style: {
        fontFamily: 'Georgia'
      }
    },
    xaxis: {
      categories: [],
      title: {
        text: 'Months',
        style: {
          fontFamily: 'Georgia'
        }
      },
      labels: {
        style: {
          fontFamily: 'Georgia'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Customers',
        style: {
          fontFamily: 'Georgia'
        }
      },
      labels: {
        style: {
          fontFamily: 'Georgia'
        }
      }
    },
    legend: {
      position: 'top',
      fontFamily: 'Georgia'
    },
    colors: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'],
    fill: {
      opacity: 1
    }
  };
  totalCustomers: any;

  constructor(private sheetservice: SheetService) {}

  ngOnInit(): void {
    this.bankCode = sessionStorage.getItem('bankCode');
    this.permission = sessionStorage.getItem('permission');
    this.getSheetDataById();
  }

  getSheetDataById() {
    this.loading = true;
    this.sheetservice.getBankSheetDataById(this.bankCode).subscribe({
      next: (res) => {
        console.log('API response:', res);
        if (res.length > 0) {
          if (this.permission === 'Bank Admin') {
            this.sheetResponse = res[0];
            this.setChartOptions(this.sheetResponse.name);
          } else if (this.permission === 'Admin') {
            this.listBankData();
            this.listUserData();
            this.sheetAdminResponse = res[0];
            this.setChartOptions(this.sheetAdminResponse.name);
          }
        } else {
          console.log('No data found for the given bank code');
        }
        this.loading = false;
      },
      error: (error) => {
        console.log('API error:', error);
        this.loading = false;
      }
    });
  }

  setChartOptions(name: string) {
    this.chartOptions = {
      series: [
        {
          name: name,
          data: [1200, 1400, 1100, 1500, 1800, 1600, 1900, 1700, 2000, 2100, 2300, 2200]
        },
      ],
      chart: {
        type: "line",
        height: 350
      },
      title: {
        text: "Customers Per Bank",
        style: {
          fontFamily: 'Georgia'
        }
      },
      xaxis: {
        categories: [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ],
        title: {
          text: "Months",
          style: {
            fontFamily: 'Georgia'
          }
        },
        labels: {
          style: {
            fontFamily: 'Georgia'
          }
        }
      },
      yaxis: {
        title: {
          text: "Customers",
          style: {
            fontFamily: 'Georgia'
          }
        },
        labels: {
          style: {
            fontFamily: 'Georgia'
          }
        }
      },
      legend: {
        position: 'top',
        fontFamily: 'Georgia'
      },
      colors: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'],
      fill: {
        opacity: 1
      }
    };
  }

  listBankData() {
    this.loading = true;
    this.sheetservice.listBankSheet().subscribe({
      next: (res) => {
        console.log(res);
        this.bankdata = res;
        this.calculateTotalCustomers();
        console.log('bank data', this.bankdata);
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  listUserData() {
    this.loading = true;
    this.sheetservice.listUserSheet().subscribe({
      next: (res) => {
        console.log(res);
        this.userdata = res;
        console.log('user data', this.userdata);
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }
  calculateTotalCustomers() {
    this.totalCustomers = this.bankdata.reduce((total:any, bank:any) => total + parseInt(bank.customers), 0);
  }
}