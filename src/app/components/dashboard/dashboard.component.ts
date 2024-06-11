import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexFill, ApexLegend, ApexTitleSubtitle, ApexXAxis, ApexYAxis } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public chartOptions!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    legend: ApexLegend;
    colors: string[];
    fill: ApexFill;
  };

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "KCB GROUP",
          data: [1200, 1400, 1100, 1500, 1800, 1600, 1900, 1700, 2000, 2100, 2300, 2200]
        },
        {
          name: "STANBIC",
          data: [1000, 1300, 1200, 1400, 1600, 1500, 1700, 1600, 1800, 1900, 2100, 2000]
        },
        {
          name: "EQUITY BANK",
          data: [1100, 1500, 1300, 1700, 1900, 1700, 2000, 1800, 2100, 2200, 2400, 2300]
        },
        {
          name: "CO-OPERATIVE BANK",
          data: [900, 1200, 1100, 1300, 1500, 1400, 1600, 1500, 1700, 1800, 2000, 1900]
        },
        {
          name: "ABSA BANK",
          data: [950, 1250, 1150, 1350, 1550, 1450, 1650, 1550, 1750, 1850, 2050, 1950]
        }
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
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
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
      colors: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'], // Add more colors as needed
      fill: {
        opacity: 1
      }
    };
  }
}