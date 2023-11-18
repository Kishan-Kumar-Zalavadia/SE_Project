import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/models/product/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  // BASE_URL = "http://localhost:9292";
  BASE_URL = "loud-egg-production.up.railway.app";

  product = new Product();

  setProduct(product: Product) {
    this.product = product;
  }
  getProduct() {
    return this.product;
  }

  constructor(private http: HttpClient) {}

  // * Get all products
  public getProductsFromRemote(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/products`);
  }

  // * Get available products
  public getAvailableProductsFromRemote(userID: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/products/available/${userID}`);
  }

  // * Get products by ProductID
  public getProductByIdFromRemote(productID: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/products/${productID}`);
  }

  // * Get Seller Details by sellerID
  public getSellerDetailsFromRemote(sellerID: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/users/${sellerID}`);
  }

  // * Add products
  public addProductFromRemote(product: Product): Observable<any> {
    return this.http.post<any>(
      `${this.BASE_URL}/products/saveProduct`,
      product
    );
  }

  // * Get products by sellerID
  public getProductsBySellerIDFromRemote(selerID: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/products/seller/${selerID}`);
  }

  // * Delete products by ProductID
  public deleteProductFromRemote(productID: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/products/${productID}`);
  }

  // * Edit products details
  public editProductDetail(editedProduct: Product): Observable<any> {
    console.log("This is from service:" + editedProduct.productID);
    return this.http.put<any>(
      `${this.BASE_URL}/products/${editedProduct.productID}`,
      editedProduct
    );
  }

  // * Get products of a user buy status = 1 (Request inspections) *
  public getProductsWithStatus(
    userID: number,
    status: number
  ): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/products/${userID}/${status}`);
  }

  // * Update product status and buyerID*
  public updateProductStatusAndBuyerID(
    userID: number,
    productID: number,
    status: number
  ): Observable<any> {
    console.log(
      "UserID" + userID + " is updated" + productID + " status" + status
    );
    return this.http.patch(
      `${this.BASE_URL}/products/${userID}/${productID}`,
      status,
      { responseType: "text" }
    );
  }

  // * Update product status *
  public updateProductStatus(
    productID: number,
    status: number
  ): Observable<any> {
    return this.http.patch(
      `${this.BASE_URL}/products/updateStatus/${productID}`,
      status,
      { responseType: "text" }
    );
  }

  // * Add to group Purchases *
  public addToGroupPurchases(
    productID: number,
    buyerID: number
  ): Observable<any> {
    return this.http.post<any>(
      `${this.BASE_URL}/groupPurchaseProducts/${productID}/${buyerID}`,
      null
    );
  }
  // * Get all the products which are group purchased by the user *
  public getGroupPurchasesProductsByUser(userID: number): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/groupPurchaseProducts/${userID}`
    );
  }

  // * Get and set the product Id for getting users of froupPurchaseProductsByUser

  groupPurchaseProductID!: number;

  setGroupPurchaseProductID(productID: number) {
    this.groupPurchaseProductID = productID;
  }

  getGroupPurchaseProductsByUser() {
    return this.groupPurchaseProductID;
  }

  // * ------------------------------------------------------------------------------------------------
  // *
}
