import { Component, Input, OnInit } from '@angular/core';
import { INavbarData, fadeInOut } from './helper';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sublevel-menu',
  template: `
    <ul *ngIf="collapsed && data.items && data.items.length > 0 " class="sublevel-nav" [@submenu]="expanded
      ? {value: 'visible', params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '*'}}
      : {value : 'hidden', params:  {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '0'}}">
      <li *ngFor="let item of data.items" class="sublevel-nav-item">
          <a class="sublevel-nav-link"(click)="handleClick(item)"*ngIf="item.items && item.items.length > 0 " [ngClass]="getActiveClass(item)">
              <!-- <i class="sublevel-link-icon "> 
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12.0001 19.0001C10.6156 19.0001 9.26223 18.5896 8.11109 17.8204C6.95994 17.0512 6.06274 15.958 5.53292 14.6789C5.00311 13.3998 4.86449 11.9924 5.13458 10.6345C5.40468 9.27663 6.07136 8.02935 7.05033 7.05038C8.0293 6.07141 9.27658 5.40472 10.6344 5.13463C11.9923 4.86453 13.3998 5.00316 14.6789 5.53297C15.9579 6.06278 17.0512 6.95999 17.8204 8.11113C18.5895 9.26228 19.0001 10.6157 19.0001 12.0001C18.998 13.856 18.2598 15.6352 16.9475 16.9475C15.6352 18.2598 13.8559 18.998 12.0001 19.0001Z" fill="#374957"/>
                </svg>
              </i> -->
              <span class="sublevel-link-text"  @fadeInOut *ngIf="collapsed">{{item.label}}</span>
              <!-- <i *ngIf="item.items && collapsed" class="menu-collapse-icon" [ngClass]="!item.expanded ? 'fal fa-angle-right' : 'fal fa-angle-down'"></i> -->
              <i *ngIf="item.items && collapsed" class="menu-collapse-icon">
                <svg *ngIf="!item.expanded" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M10.8111 18.707L9.40015 17.293L14.6891 12L9.40015 6.70697L10.8151 5.29297L16.1001 10.586C16.4751 10.961 16.6857 11.4696 16.6857 12C16.6857 12.5303 16.4751 13.0389 16.1001 13.414L10.8111 18.707Z" fill="#374957"/>
                </svg>
                <svg *ngIf="item.expanded" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8.29492L6 14.2949L7.41 15.7049L12 11.1249L16.59 15.7049L18 14.2949L12 8.29492Z" fill="black" fill-opacity="0.56"/>
                </svg>
              </i>
          </a>
          <a class="sublevel-nav-link" *ngIf="!item.items || (item.items && item.items.length == 0)"[routerLink]="[item.routeLink]"
            routerLinkActive="active-sublevel"[routerLinkActiveOptions]="{exact: true}">
            <!-- <i class="sublevel-link-icon "> 
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12.0001 19.0001C10.6156 19.0001 9.26223 18.5896 8.11109 17.8204C6.95994 17.0512 6.06274 15.958 5.53292 14.6789C5.00311 13.3998 4.86449 11.9924 5.13458 10.6345C5.40468 9.27663 6.07136 8.02935 7.05033 7.05038C8.0293 6.07141 9.27658 5.40472 10.6344 5.13463C11.9923 4.86453 13.3998 5.00316 14.6789 5.53297C15.9579 6.06278 17.0512 6.95999 17.8204 8.11113C18.5895 9.26228 19.0001 10.6157 19.0001 12.0001C18.998 13.856 18.2598 15.6352 16.9475 16.9475C15.6352 18.2598 13.8559 18.998 12.0001 19.0001Z" fill="#374957"/>
                </svg>
            </i> -->
            <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{item.label}}</span>
          </a>
          <div *ngIf="item.items && item.items.length > 0">
              <app-sublevel-menu 
                [data]="item"
                [collapsed]="collapsed"
                [multiple]="multiple"
                [expanded]="item.expanded" >
              </app-sublevel-menu>
          </div>
      </li>
    </ul>
  `,
  styleUrls: ['./sidebar.component.css'],
  animations: [
    fadeInOut,
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [
        style({ overflow: 'hidden' }),
        animate('{{transitionParams}}')]),
      transition('void => *', animate(0)),
    ]),
  ]
})
export class SublevelMenuComponent implements OnInit {

  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    access: '',
    items: []
  }

  @Input() collapsed = false;
  @Input() animating: boolean | undefined;

  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: INavbarData): string {
    return item.expanded && this.router.url.includes(item.routeLink) ? 'active-sublevel' : '';
  }

}
