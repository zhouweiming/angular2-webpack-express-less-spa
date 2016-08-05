import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

@Component({
  selector: 'app-layout',
  template: require('./applayout.component.html'),
  styles: [require("./applayout.component.less")],
  directives: [ROUTER_DIRECTIVES]
})

export class AppLayoutComponent { }