import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { navbarData } from './nav-data';
import { INavbarData, fadeInOut } from './helper';

interface SideNavToogle {

  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ 'transform': 'rotate(0deg)', offset: '0' }),
            style({ 'transform': 'rotate(2turn)', offset: '1' }),
          ]))
      ])
    ])

  ]
})
export class SidebarComponent implements OnInit {


  @Output() onToggleSideNav: EventEmitter<SideNavToogle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0
  permission: any;
  username: any;
  partner: any;
  userId: any;
  navData = navbarData;
  multiple: boolean = false;
  access_token: any;
  refresh_token: any;
  userName: any;
  staffNo: any;
  email: any;
  phone: any;
  userPermissions: any;
  

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }

  }
  constructor(private router: Router) { }


  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.userName = sessionStorage.getItem('username');
    this.accessControl();
    
  }


  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });

  }
  handleClick(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  accessControl(): void {
    const userAccess:any = sessionStorage.getItem('permission');
    console.log('userAccess', userAccess)
    const userPermissions = userAccess.split(',').map((access:any) => access.trim());
    // Replace this with the actual access level of the user

    // Filter the navbarData array based on user access level
    const filteredNavbarData: any[] = navbarData.filter(item => {
      const accessLevels = item.access.split(',').map(access => access.trim());
      console.log('accessLevels', accessLevels)
      // return accessLevels.includes(userAccess);
      return accessLevels.some(access => userPermissions.includes(access));
    });

    // Update navbarData with the filtered data
    this.navData = filteredNavbarData;
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }






}
