
import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Order } from "app/order/order.model";
import { Observable } from "rxjs/Observable";
import {HttpClient, HttpHeaders} from '@angular/common/http'
import 'rxjs/add/operator/map'
import {MEAT_API} from 'app/app.api'

@Injectable()
export class OrderService {

  constructor(
        private cartService: ShoppingCartService,
        private http: HttpClient){}

  itemsValue(): number {
    return this.cartService.total()
  }

  cartItems(): CartItem[]{
    return this.cartService.items
  }

  increaseQty(item: CartItem){
    this.cartService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
    this.cartService.decreaseQty(item)
  }

  remove(item: CartItem){
    this.cartService.removeItem(item)
  }

  clear(){
    this.cartService.clear()
  }

  checkOrder(order: Order): Observable<string>{
    /*
      Código implementado de forma centralizada no auth.interceptor
      let headers = new HttpHeaders()
      if(this.loginService.isLoogedIn()){
        Coloca o token de autorização nos headers da requisição
        headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
      }
      return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers}).map(order => order.id)
    */
    return this.http.post<Order>(`${MEAT_API}/orders`, order).map(order => order.id)
  }
}
