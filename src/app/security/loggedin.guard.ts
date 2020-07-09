import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "app/security/login/login.service";

//A classe LoggedInGuard permite ou não o carregamento das rotas loadChildren
@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

  constructor(private loginService: LoginService){}

  checkAuthentication(path: string): boolean {
    const loggedIn = this.loginService.isLoogedIn()
    if(!loggedIn){
        //route.path vem do LoggedInGuard no app.routes
        this.loginService.handleLogin(`/${path}`)

    }
    return loggedIn
  }

  //Permite carregar a rota
  canLoad(route: Route): boolean {
    console.log('canLoad')
    return this.checkAuthentication(route.path)
  }

  //ActivatedRouteSnapshot é uma cópia da rota ativada. RouterStateSnapshot é uma árvore de todas as rotas
  //Método para checar se a rota é ativa
  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean{
    console.log('canActivate')
    return this.checkAuthentication(activatedRouteSnapshot.routeConfig.path)
  }
}
