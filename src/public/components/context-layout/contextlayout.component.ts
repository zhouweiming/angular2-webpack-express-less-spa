import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { ContextLayoutService } from "../../services/contexttitle.service";

@Component({
  selector: 'context-layout',
  template: require('./contextlayout.component.html'),
  //styles: [require("./contextlayout.component.less")],
  directives: [ROUTER_DIRECTIVES]
})

export class ContextLayoutComponent {
  private title: string = "need title";
  constructor(private contextLayoutService: ContextLayoutService){
    contextLayoutService.missionConfirmed$.subscribe(({ title }) => {
      this.title = title;
    });
  }
}