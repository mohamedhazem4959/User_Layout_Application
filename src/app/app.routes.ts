import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Order } from './components/order/order';
import { ProductDetails } from './components/product-details/product-details';
import { Cart } from './components/cart/cart';
import { UserProfile } from './components/user-profile/user-profile';
import { authGuardGuard } from './guards/auth.guard-guard';
import { Testimoinals } from './components/testimoinals/testimoinals';
import { AddTestimoinal } from './components/add-testimoinal/add-testimoinal';
import { Faq } from './components/faq/faq';


export const routes: Routes = [
    {path: '' , component:Home},
    {path:'order' , component:Order,canActivate:[authGuardGuard]}, // /order/:id
    {path:'product-details/:route' , component:ProductDetails},
    {path:'cart' , component:Cart , canActivate:[authGuardGuard]},
    {path:'login' , component:Login},
    {path:'register',component:Register},
    {path:'user' , component:UserProfile,canActivate:[authGuardGuard]},
    {path: 'category/:categoryRoute' , component:Home},
    {path:'testimoinals' , component:Testimoinals},
    {path:'addTestimoinal' , component:AddTestimoinal , canActivate:[authGuardGuard]},
    {path: 'faq' , component:Faq}
];
