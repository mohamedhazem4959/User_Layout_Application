import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Order } from './components/order/order';
import { ProductDetails } from './components/product-details/product-details';
import { Cart } from './components/cart/cart';
import { UserProfile } from './components/user-profile/user-profile';
import { authGuardGuard } from './guards/auth.guard-guard';


export const routes: Routes = [
    {path: '' , component:Home},
    {path:'order' , component:Order,canActivate:[authGuardGuard]},
    {path:'product-details/:route' , component:ProductDetails},
    {path:'cart' , component:Cart , canActivate:[authGuardGuard]},
    {path:'login' , component:Login},
    {path:'register',component:Register},
    {path:'user' , component:UserProfile,canActivate:[authGuardGuard]},
    {path: 'category/:categoryRoute' , component:Home}
];
