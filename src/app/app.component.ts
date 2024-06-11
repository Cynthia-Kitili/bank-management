import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

interface SideNavToogle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bank-management';
  path = '';
  isSideNavCollapsed = false;
  screenWidth = 0;
  collapsed: any;

  constructor(
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.path = this.location.path();
    });
  }

  onToggleSidenav(data: SideNavToogle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;

  }
}
