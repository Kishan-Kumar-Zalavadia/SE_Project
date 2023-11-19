import { Component } from "@angular/core";
import { ProductService } from "../../services/product-service/product.service";
import { Router } from "@angular/router";
import { Product } from "../../models/product/product";
import { data } from "jquery";
import { UserService } from "../../services/user-service/user.service";
import { User } from "../../models/user/user";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent {
  inspectionRequestedProducts: Product[] = [];
  purchasedProducts: Product[] = [];
  inspectiononRequestedApprovedProducts: Product[] = [];
  groupPurchasedProducts: Product[] = [];

  user = new User();

  constructor(
    private _productService: ProductService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.user = _userService.getUser();
    this.getProductsWithStatus();
    if (this.user.id === undefined) {
      this._router.navigate([""]);
    }
    this.groupPurchasedItems();
  }

  getProductsWithStatus() {
    // console.log("UserName: " + this.user.userName);
    // * Get product with status=1 [Inperson Requested Product]
    this._productService.getProductsWithStatus(this.user.id, 1).subscribe(
      (data) => {
        this.inspectionRequestedProducts = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

    // * Get product with status=3 [Purchased Products]
    this._productService.getProductsWithStatus(this.user.id, 3).subscribe(
      (data) => {
        this.purchasedProducts = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

    // * Get product with status=2 [Inperson Inspection Request approved Products]
    this._productService.getProductsWithStatus(this.user.id, 2).subscribe(
      (data) => {
        this.inspectiononRequestedApprovedProducts = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // * View the product details
  viewProduct(product: Product) {
    this._productService.setProduct(product);
    console.log("ID:" + product.productID);
    this._router.navigate(["/buy", product.productID]);
  }

  // * View all the products which are group Purchased
  groupPurchasedItems() {
    this._productService
      .getGroupPurchasesProductsByUser(this.user.id)
      .subscribe(
        (data) => {
          this.groupPurchasedProducts = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
