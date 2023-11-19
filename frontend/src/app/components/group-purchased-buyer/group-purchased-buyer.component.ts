import { Component } from "@angular/core";
import { User } from "../../models/user/user";
import { UserService } from "../../services/user-service/user.service";
import { ProductService } from "../../services/product-service/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-group-purchased-buyer",
  templateUrl: "./group-purchased-buyer.component.html",
  styleUrls: ["./group-purchased-buyer.component.scss"],
})
export class GroupPurchasedBuyerComponent {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private _router: Router
  ) {}
  productID!: number;

  ngOnInit(): void {
    this.productID = this.productService.getGroupPurchaseProductsByUser();
    this.userService
      .fetchUsersByProductForGroupPurchase(this.productID)
      .subscribe((data) => {
        this.users = data;
        console.log("I am happy bedu");
        console.log(data);
      });
  }

  // * --------------------------------------------------------------------------------------------------------------------------
  // * Back Button *
  goToSellComponent() {
    this._router.navigate(["/home/sell"]);
  }
}
