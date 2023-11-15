import { Component } from '@angular/core';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: "app-all-products",
  templateUrl: "./all-products.component.html",
  styleUrls: ["./all-products.component.scss"],
})
export class AllProductsComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  // * --------------------------------------------------------------------------------------------------------------------------------
  // * Get all the Products
  getAllProducts() {
    // Call your product service to get all products
    this.productService.getProductsFromRemote().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }

  // In your component class
  getStatusLabel(status: number): string {
    switch (status) {
      case 0:
        return "Unsold";
      case 1:
        return "Inspection Request";
      case 2:
        return "In-person Request Approved";
      case 3:
        return "Sold";
      default:
        return "Unknown Status";
    }
  }

  getGroupPurchasesLabel(group: number): string {
    switch(group){
      case 1: return 'Yes';
      default: return 'No';
    }
  }

  // * --------------------------------------------------------------------------------------------------------------------------------
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

  // * --------------------------------------------------------------------------------------------------------------------------------
  // * Delete Product
  deleteProductLogic(product: Product) {
    this.productService.deleteProductFromRemote(product.productID).subscribe(
      (data) => {
        alert("Product Deleted");
        this.getAllProducts();
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
        this.getAllProducts();
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
}
