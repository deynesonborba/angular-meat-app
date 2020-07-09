import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router"
import { OrderComponent } from "./order.component";
import { OrderItemsComponent } from "app/order/order-items/order-items.component";
import { DeliveryCostsComponent } from "app/order/delivery-costs/delivery-costs.component";
import { SharedModule } from "app/shared/shared.module";
import { LeaveOrderGuard } from "app/order/leave-order.guard";

const ROUTES: Routes = [
  {path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
]

@NgModule({
  declarations: [OrderComponent, OrderItemsComponent, DeliveryCostsComponent],
  imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class OrderModule{}
