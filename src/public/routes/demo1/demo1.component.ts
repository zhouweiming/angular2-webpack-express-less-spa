import { Component } from '@angular/core';
import { ContextLayoutService } from "../../services/contexttitle.service";

@Component({
  selector: 'demo1',
  template: require('./demo1.component.html'),
  //styles: [require("./demo1.component.less")]
})

export class Demo1Component {

  constructor(private contextLayoutService: ContextLayoutService){
    contextLayoutService.confirmMission({ title: "demo1" });
  }
}