import { FoodOrderComponent } from './food-order/food-order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [  
  {path:'login',component: LoginComponent},
  {path:'', redirectTo: 'login', pathMatch:'full'},
  {path:'fo', canActivate: [ AuthGuard ], component: FoodOrderComponent, runGuardsAndResolvers: 'always'},
  {path:'**', redirectTo: 'login', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
