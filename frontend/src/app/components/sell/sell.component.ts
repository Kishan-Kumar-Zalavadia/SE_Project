import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { RegistrationService } from "../../services/registration/registration.service";
import { Router } from "@angular/router";
import { ProductService } from "../../services/product-service/product.service";
import { Product } from "../../models/product/product";
import { UserService } from "../../services/user-service/user.service";
import { User } from "../../models/user/user";
import { MatDialog } from "@angular/material/dialog";
import "bootstrap/js/dist/modal"; // Import Bootstrap's modal module
import { NgForm } from "@angular/forms";
import { data } from "jquery";

@Component({
  selector: "app-sell",
  templateUrl: "./sell.component.html",
  styleUrls: ["./sell.component.scss"],
})
export class SellComponent {
  product = new Product();
  user = new User();
  msg = "";
  myProducts: Product[] = [];

  // Separate arrays for products with different statuses
  availableProducts: Product[] = [];
  inPersonInspectionProducts: Product[] = [];
  acceptedInspectionProducts: Product[] = [];
  soldProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private _router: Router,
    private dialog: MatDialog
  ) {
    this.user = userService.getUser();
    this.product.sellerID = this.user.id;
    this.getProductSoldByMe();
    if (this.user.id === undefined) {
      this._router.navigate([""]);
    }
  }

  ngOnInit() {}

  // --------------------------------------------------------------------------------------------------------------------------------
  // * Add Product to sell
  @ViewChild("addProductForm", { static: false }) addProductForm!: NgForm;

  addProduct() {
    this.productService.addProductFromRemote(this.product).subscribe(
      (data) => {
        // console.log(
        //   "Responce recived while adding a product" +
        //     JSON.stringify(this.product)
        // );
        // console.log("Seller:" + this.user.userName);
        this.msg = "Product Added";
        this.getProductSoldByMe();
        alert(this.msg);
        this.addProductForm.resetForm();
      },
      (error) => {
        console.log("Exception occured while adding a product");
      }
    );
  }

  // --------------------------------------------------------------------------------------------------------------------------------
  // * Get Product which I am selling
  getProductSoldByMe() {
    this.productService.getProductsBySellerIDFromRemote(this.user.id).subscribe(
      (data) => {
        // console.log("Products sold by me: " + JSON.stringify(data));
        this.myProducts = data;
        this.categorizeProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // --------------------------------------------------------------------------------------------------------------------------------
  // * Delete Product Confirmation
  deleteProduct(product: Product) {
    const confirmation = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmation) {
      // User clicked "OK," delete the product here
      // Call your deleteProduct logic or API call
      this.deleteProductLogic(product);
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------
  // * Delete Product
  deleteProductLogic(product: Product) {
    this.productService.deleteProductFromRemote(product.productID).subscribe(
      (data) => {
        // console.log("Product deleted" + JSON.stringify(data));
        this.getProductSoldByMe();
        alert("Product Deleted");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // --------------------------------------------------------------------------------------------------------------------------------
  // * Edit Product

  editedProduct = new Product(); // Current product being edited

  showPopup: boolean = false; // Controls the visibility of the edit popup

  // Method to edit a product
  editProduct(product: Product) {
    // Set the product to be edited
    this.editedProduct = { ...product };
    this.showPopup = true;
  }

  // Method to update the product
  updateProduct() {
    // Implement the logic to update the product details (e.g., in your service)
    this.productService.editProductDetail(this.editedProduct).subscribe(
      (data) => {
        // console.log("Product edited" + JSON.stringify(this.editedProduct));
        alert("Product updated");
        this.getProductSoldByMe();
      },
      (error) => {
        console.log(error);
      }
    );
    // After updating, close the popup
    this.showPopup = false;
  }

  // Method to close the edit popup
  closePopup() {
    this.showPopup = false;
  }

  // --------------------------------------------------------------------------------------------------------------------------------
  // * Categorize Product
  categorizeProducts() {
    this.availableProducts = this.myProducts.filter(
      (product) => product.status === 0
    );
    this.inPersonInspectionProducts = this.myProducts.filter(
      (product) => product.status === 1
    );
    this.acceptedInspectionProducts = this.myProducts.filter(
      (product) => product.status === 2
    );
    this.soldProducts = this.myProducts.filter(
      (product) => product.status === 3
    );
  }

  // --------------------------------------------------------------------------------------------------------------------------------
  // * Accept In-Person Inspection Products Confirmation

  acceptInPersonRequest(product: Product) {
    const confirmation = window.confirm(
      "Are you sure you want to accept in-person inspection for this product?"
    );
    if (confirmation) {
      this.acceptInPersonRequestLogic(product);
    }
  }

  // * Accept In-Person Inspection Products Logic
  acceptInPersonRequestLogic(product: Product) {
    this.productService.updateProductStatus(product.productID, 2).subscribe(
      (data) => {
        alert("In-Person Inspection Accepted");
        this.getProductSoldByMe();
        this.categorizeProducts();
        console.log("Product status updated to 2: " + data);
      },
      (error) => {
        alert("Unable to accept In-Person Requests");
        console.log("Error updating product status: " + error);
      }
    );

    // this.userService.increaseBonusPoints(this.user.id, 5).subscribe(
    //   (response) => {
    //     console.log("Bonus points increased successfully:", response);
    //   },
    //   (error) => {
    //     console.error("Error increasing bonus points:", error);
    //   }
    // );

    // this.userService.increaseBonusPoints(this.product.buyerID, 5).subscribe(
    //   (response) => {
    //     console.log("Bonus points increased successfully:", response);
    //   },
    //   (error) => {
    //     console.error("Error increasing bonus points:", error);
    //   }
    // );
  }

  // --------------------------------------------------------------------------------------------------------------------------------
  // * Buyer Details
  viewBuyerDetails(product: Product) {
    // this._router.navigate(["sellerDetails"]);
    this.productService.setProduct(product);
    this._router.navigate(["/buyerDetails", product.buyerID]);
  }

  // --------------------------------------------------------------------------------------------------------------------------------
  // * View Buyers purchased a Group Purchase Product
  viewBuyersInGroupProduct(product: Product) {
    this.productService.setGroupPurchaseProductID(product.productID);
    this._router.navigate(["/GroupPurchasedBuyerComponent"]);
  }
}
