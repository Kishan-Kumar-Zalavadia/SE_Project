import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { HomeComponent } from "./components/home/home.component";
import { SellComponent } from "./components/sell/sell.component";
import { BuyComponent } from "./components/buy/buy.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { SellerDetailsComponent } from "./components/seller-details/seller-details.component";
import { CartComponent } from "./components/cart/cart.component";
import { BuyerDetailsComponent } from "./components/buyer-details/buyer-details.component";
import { GroupPurchasedBuyerComponent } from "./components/group-purchased-buyer/group-purchased-buyer.component";
import { AllProductsComponent } from "./components/admin/all-products/all-products.component";
import { AllUsersComponent } from "./components/admin/all-users/all-users.component";
import { AllGroupProductsComponent } from "./components/admin/all-group-products/all-group-products.component";

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
  exports: [RouterModule],
})
export class AppRoutingModule {}
