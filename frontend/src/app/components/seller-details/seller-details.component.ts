import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user-service/user.service";
import { User } from "../../models/user/user";
import { ProductService } from "../../services/product-service/product.service";
import { Product } from "../../models/product/product";

@Component({
  selector: "app-seller-details",
  templateUrl: "./seller-details.component.html",
  styleUrls: ["./seller-details.component.scss"],
})
export class SellerDetailsComponent {
  seller: User = new User();
  product: Product = new Product();

  constructor(
    private _router: Router,
    private _productService: ProductService,
    private _userService: UserService
  ) {
    this.product = this._productService.getProduct();
    this.getUserById();
    if (this.product.productID === undefined) {
      this._router.navigate([""]);
    }
  }

  // * Back button
  goToProductDetailsComponent() {
    this._router.navigate(["/buy/{product.id}"]);
  }

  // * Get Seller Details
  getUserById() {
    this._userService.getUserByIDFromRemote(this.product.sellerID).subscribe(
      (data) => {
        console.log(data);
        this.seller = data;
        console.log(this.seller.userName);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
