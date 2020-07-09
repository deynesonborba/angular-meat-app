import {HttpErrorResponse} from '@angular/common/http'
import { Observable } from "rxjs/Observable";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { NotificationService } from "app/shared/messages/notification.service";
import { LoginService } from "app/security/login/login.service";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler{

  //Injector é usado quando tem-se injeção de dependência cíclica.
  constructor(private ns: NotificationService, private injector: Injector, private zone: NgZone){
    super()//chama o construtor de ErrorHandler
  }

  handleError(errorResponse: HttpErrorResponse | any){
    if(errorResponse instanceof HttpErrorResponse){
      const message = errorResponse.error.message
      //NgZone é usado para corrigir o comportamento errôneo do snackbar de erro.
      //Acontece porque o timer está executando fora da zona do angular, ou algo assim XD...
      this.zone.run( () => {
        switch(errorResponse.status){
          case 401:
          this.injector.get(LoginService).handleLogin()
          break;
          case 403:
            this.ns.notify(message || 'Não autorizad0.')
          break;
          case 404:
            this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes.')
          break;
        }
      })

    }
    super.handleError(errorResponse)
  }
}


/*
export class ErrorHandler {
  static handleError(error: Response | any){
    let errorMessage: string

    if(error instanceof HttpErrorResponse){
      const body = error.error
      errorMessage = `${error.url}: ${error.status} - ${error.statusText || ''} ${body}`
    }else {
      errorMessage = error.message ? error.message : error.toString()
    }
    console.log(errorMessage)
    return Observable.throw(errorMessage)

  }
}
*/
