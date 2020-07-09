
import { NgModule, ModuleWithProviders } from "@angular/core";
import { InputComponent } from "app/shared/input/input.component";
import { RadioComponent } from "app/shared/radio/radio.component";
import { RatingComponent } from "app/shared/rating/rating.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "app/restaurants/restaurants.service";
import { OrderService } from "app/order/order.service";
import { SnackbarComponent } from 'app/shared/messages/snackbar/snackbar.component';
import { NotificationService } from "app/shared/messages/notification.service";
import { LoginService } from "app/security/login/login.service";
import { LoggedInGuard } from "app/security/loggedin.guard";
import { LeaveOrderGuard } from "app/order/leave-order.guard";
import { HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthInterceptor } from "app/security/auth.interceptor";

@NgModule({
  declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, RadioComponent, RatingComponent, CommonModule, FormsModule, ReactiveFormsModule, SnackbarComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers: [ShoppingCartService,
                  RestaurantsService,
                  OrderService,
                  NotificationService,
                  LoginService,
                  LoggedInGuard,
                  LeaveOrderGuard,
                  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
    }
  }
}
