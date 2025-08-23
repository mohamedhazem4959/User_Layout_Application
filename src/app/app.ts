import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './components/home/home';
import { ProductDetails } from "./components/product-details/product-details";
import { Cart } from "./components/cart/cart";
import { Order } from "./components/order/order";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { UserProfile } from "./components/user-profile/user-profile";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Home, ProductDetails, Cart, Order, Login, Register, Header, Footer, UserProfile],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ecommerce');
}
