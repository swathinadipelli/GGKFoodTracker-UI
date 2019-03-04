import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodOrderComponent } from './food-order/food-order.component';
import { FoodOrderService } from './food-order/food-order.service';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { OrderManagementComponent } from './order-management/order-management.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import {ChartModule} from 'primeng/chart';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToastModule} from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {LoginService} from '../app/login/login.service';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LoaderModule } from './loader/loader.module';

@NgModule({
  declarations: [
    AppComponent,
    FoodOrderComponent,
    OrderManagementComponent,
    OrderTrackingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    DropdownModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ChartModule,
    RadioButtonModule,
    ToastModule,
    HttpClientModule,
    ProgressSpinnerModule,
    LoaderModule
  ],
  providers: [FoodOrderService,LoginService, DatePipe, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
