import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { SellComponent } from './sell/sell.component';
import { BuyComponent } from './buy/buy.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { CartComponent } from './cart/cart.component';
import { BuyerDetailsComponent } from './buyer-details/buyer-details.component';
import { GroupPurchasedBuyerComponent } from './group-purchased-buyer/group-purchased-buyer.component';
import { AllProductsComponent } from './admin/all-products/all-products.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { AllGroupProductsComponent } from './admin/all-group-products/all-group-products.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "sell", component: SellComponent },
      { path: "buy", component: BuyComponent },
      { path: "profile", component: ProfileComponent },
      { path: "cart", component: CartComponent },
      { path: "allUsers", component: AllUsersComponent },
      { path: "allProducts", component: AllProductsComponent },
      { path: "allGroupProducts", component: AllGroupProductsComponent },
    ],
  },
  { path: "buy/:id", component: ProductDetailsComponent },
  { path: "sellerDetails/:id", component: SellerDetailsComponent },
  { path: "buyerDetails/:id", component: BuyerDetailsComponent },
  {
    path: "GroupPurchasedBuyerComponent",
    component: GroupPurchasedBuyerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
