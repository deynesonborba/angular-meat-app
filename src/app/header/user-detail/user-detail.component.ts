import { Component, OnInit } from '@angular/core';
import { LoginService } from "app/security/login/login.service";
import { User } from "app/security/login/user.model";

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  user(): User{
    console.log(this.loginService.user)
    return this.loginService.user
  }

  isLoggedIn(): boolean{
    return this.loginService.isLoogedIn()
  }

  login(){
    this.loginService.handleLogin()
  }

  logout(){
    this.loginService.logout()
  }

}
