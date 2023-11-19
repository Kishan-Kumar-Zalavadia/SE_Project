import { Component } from "@angular/core";
import { Route, Router } from "@angular/router";
import { ProductService } from "../../services/product-service/product.service";
import { Product } from "../../models/product/product";
import { UserService } from "../../services/user-service/user.service";
import { User } from "../../models/user/user";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent {
  product: Product = new Product();
  seller: User = new User();
  user: User = new User();

  constructor(
    private _router: Router,
    private _productService: ProductService,
    private _userService: UserService
  ) {
    this.product = this._productService.getProduct();
    this.user = this._userService.getUser();
    if (this.user.id === undefined) {
      this._router.navigate([""]);
    }
  }

  onInit() {}

  // * Back button
  goToBuyComponent() {
    this._router.navigate(["/home/buy"]);
  }

  // * Seller Details *
  viewSellerDetailsBySendingProduct(product: Product) {
    // this._router.navigate(["sellerDetails"]);
    this._productService.setProduct(product);
    this._router.navigate(["/sellerDetails", product.sellerID]);
  }

  // *--------------------------------------------------------------------------------------------------------------------------------
  // * In-person Inspection Request Confirmation*
  inPersonInspectionRequest(product: Product) {
    const confirmation = window.confirm(
      "Are you sure you want to request in-person inspection for this product?"
    );
    if (confirmation) {
      this.inPersonInspectionRequestLogic(product);
    }
  }
  // * In-person Inspection Request Logic*
  inPersonInspectionRequestLogic(product: Product) {
    this._productService
      .updateProductStatusAndBuyerID(this.user.id, this.product.productID, 1)
      .subscribe(
        (data) => {
          console.log("InPerson Inspection Request Sent: " + data);
          alert("Inspection Request sent successfully");
          this._router.navigate(["/home/cart"]);
        },
        (error) => {
          alert(
            "Inspection Request already sent, check cart for more information"
          );
          this._router.navigate(["/home/cart"]);
        }
      );
  }

  // *--------------------------------------------------------------------------------------------------------------------------------
  // * Buy Product Confirmation *
  buyProduct(product: Product) {
    const confirmation = window.confirm(
      "Are you sure you want to buy this product?"
    );
    if (confirmation) {
      this.buyProductLogic(product);
    }
  }

  //  * Buy Product *
  buyProductLogic(product: Product) {
    console.log("Buy for Product: " + product.title);
    this._productService
      .updateProductStatusAndBuyerID(this.user.id, product.productID, 3)
      .subscribe(
        (data) => {
          alert("Product Purchased successfully");
          console.log("Product status updated to 3: " + data);
          this._router.navigate(["/home/cart"]);
        },
        (error) => {
          alert("Unable to Purchase Product");
          console.log("Error updating product status: " + error);
        }
      );
  }
  // *--------------------------------------------------------------------------------------------------------------------------------
  // * Buy Product in Group *
  buyProductInGroup(product: Product) {
    const confirmation = window.confirm(
      "Are you sure you want to buy this product in Group?"
    );
    if (confirmation) {
      this.buyProductInGroupLogic(product);
    }
  }

  // * Buy Product in Group Logic
  buyProductInGroupLogic(product: Product) {
    console.log(
      "Product ",
      this.product.title,
      " purchase in group by - " + this.user.userName
    );
    this._productService
      .addToGroupPurchases(this.product.productID, this.user.id)
      .subscribe(
        (data) => {
          alert("Product Purchased successfully in Group");
          this._router.navigate(["/home/cart"]);
        },
        (error) => {
          alert("Unable to Purchase Product");
          console.log("Error updating product status: " + error);
        }
      );
  }
}
