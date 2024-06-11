import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  path = '';
  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((val) => {
      this.path = this.location.path();
    });
  }

  @Input() collapsed = true;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';

    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;

  }

}
