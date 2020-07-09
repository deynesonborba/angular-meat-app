

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from 'rxjs/Observable'
import { MEAT_API } from "app/app.api";
import { User } from "app/security/login/user.model";
import 'rxjs/add/operator/do'
import { Router, NavigationEnd } from "@angular/router";
import 'rxjs/add/operator/filter'

@Injectable()
export class LoginService {

  user: User
  lastUrl: string

  constructor(private http: HttpClient, private router: Router){

    //Listener que monitora os eventos do router com filtro para pegar apenas a última url
    this.router.events.filter(e => e instanceof NavigationEnd)
                      .subscribe((e: NavigationEnd) => this.lastUrl = e.url)
  }

  //Confere se está logado
  isLoogedIn(): boolean{
    return this.user !== undefined
  }

  //Efetua o login
  login(email: string, password: string): Observable<any> {
    return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password})
            .do(user => this.user = user)
  }

  //Efetua o logout
  logout(){
    this.user = undefined
  }

  //Encaminha para a pág de login e retornar para a última url
  handleLogin(path: string = this.lastUrl){
    //btoa encoda o path em base64 para não ficar uma url feia para o client
    this.router.navigate(['/login', btoa(path)])
  }

}
