

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "app/security/login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector){}

  //Intercepta as requisições para o back-end
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const loginService = this.injector.get(LoginService)

    if(loginService.isLoogedIn()){
      //Adiciona o headers. Use-se clone() pq o HttpRequest<> é imutável
      const authRequest = request.clone({setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`}})
      return next.handle(authRequest)
    }else{
      //Não faz nada e segue
      return next.handle(request)
    }
  }
}
