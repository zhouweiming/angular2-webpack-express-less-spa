import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import "./applayout.component.less";

@Component({
  selector: 'app-layout',
  template: require('./applayout.component.html'),
  styleUrls: [("./applayout.component.less")],
  directives: [ROUTER_DIRECTIVES]
})

export class AppLayoutComponent { }