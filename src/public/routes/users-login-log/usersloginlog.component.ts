import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service"
@Component({
  selector: 'users-login-log',
  template: require('./usersloginlog.component.html'),
  //styles: [require("./usersloginlog.component.less")],
  providers: [UserService]
})

export class UsersLoginLogComponent implements OnInit {
  private users: any[] = [];
  private pageCount: number = 0;
  private pageIndex = 0;
  private pageSize = 10;
  constructor(private userService: UserService){}
  bindData(){
    this.userService["getAllUserLoginLog"]({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }).then(result => {
      this.users = result.list;
      this.pageCount = Math.floor(result.count / this.pageSize);
    });
  }
  ngOnInit() {
    this.bindData();
  }
  goto(_d){
    if(_d === -1){
      this.pageIndex = Math.max(this.pageIndex - 1, 0);
    }else{
      this.pageIndex = Math.min(this.pageIndex + 1, this.pageCount);
    }
    this.bindData();
  }
}