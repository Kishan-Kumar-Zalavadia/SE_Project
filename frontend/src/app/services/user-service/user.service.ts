import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/user/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = "http://localhost:9292";

  user = new User();

  setUser(user: User) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }

  seller = new User();

  setSeller(seller: User) {
    this.seller = seller;
  }

  getSeller() {
    return this.seller;
  }

  constructor(private _http: HttpClient) {}

  public getUserByIDFromRemote(userId: number): Observable<any> {
    // const url = `http://localhost:9292/users/${userId}`;
    const url = `${this.baseUrl}/users/${userId}`;
    return this._http.get<any>(url);
  }

  //* Get all the users buying a group product
  fetchUsersByProductForGroupPurchase(product_id: number): Observable<User[]> {
    // const url = `http://localhost:9292/users/getUsersByProductGroupPurchases/${product_id}`;
    const url = `${this.baseUrl}/users/getUsersByProductGroupPurchases/${product_id}`;
    return this._http.get<User[]>(url);
  }

  //* Add bounus points
  increaseBonusPoints(userId: number, n: number): Observable<any> {
    // const url = `http://localhost:9292`;
    // return this._http.patch(`${url}/users/${userId}/increaseBonus`, n);
    const url = `${this.baseUrl}/users/${userId}/increaseBonus`;
    return this._http.patch(url, n);
  }

  //* ------------------------------------------------------------------------------------------------
  // * For ADMIN ONLY
  // private apiUrl = "http://localhost:9292/users";
  private apiUrl = `${this.baseUrl}/users`;

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.apiUrl);
  }

  // Update user
  updateUserDetails(updatedUser: User): Observable<User> {
    const url = `${this.apiUrl}/update/${updatedUser.id}`;
    return this._http.put<User>(url, updatedUser);
  }
}
