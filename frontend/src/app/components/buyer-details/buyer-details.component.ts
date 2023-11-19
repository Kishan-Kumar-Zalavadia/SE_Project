import { Component } from "@angular/core";
import { User } from "../../models/user/user";
import { Product } from "../../models/product/product";
import { Router } from "@angular/router";
import { ProductService } from "../../services/product-service/product.service";
import { UserService } from "../../services/user-service/user.service";

@Component({
  selector: "app-buyer-details",
  templateUrl: "./buyer-details.component.html",
  styleUrls: ["./buyer-details.component.scss"],
})
export class BuyerDetailsComponent {
  buyer: User = new User();
  product: Product = new Product();

  constructor(
    private _router: Router,
    private _productService: ProductService,
    private _userService: UserService
  ) {
    this.product = this._productService.getProduct();
    this.getUserById();
  }

  // * --------------------------------------------------------------------------------------------------------------------------
  // * Get Seller Details
  getUserById() {
    this._userService.getUserByIDFromRemote(this.product.buyerID).subscribe(
      (data) => {
        console.log(data);
        this.buyer = data;
        console.log(this.buyer.userName);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // * --------------------------------------------------------------------------------------------------------------------------
  // * Back Button *
  goToSellComponent() {
    this._router.navigate(["/home/sell"]);
  }
}
