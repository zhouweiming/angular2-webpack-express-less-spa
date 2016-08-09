import { Component } from '@angular/core';
import { ContextLayoutService } from "../../services/contexttitle.service";

@Component({
  selector: 'demo',
  template: require('./demo.component.html'),
  //styles: [require("./demo.component.less")]
})

export class DemoComponent {
  constructor(private contextLayoutService: ContextLayoutService){
    contextLayoutService.confirmMission({ title: "demo" });
  }
}