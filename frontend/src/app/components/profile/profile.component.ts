import { Component } from "@angular/core";
import { RegistrationService } from "../../services/registration/registration.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user-service/user.service";
import { User } from "../../models/user/user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
  user = new User();
  constructor(
    private _service: RegistrationService,
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = this._userService.getUser();
    if (this.user.id === undefined) {
      this._router.navigate([""]);
    }
  }

  ngOnInit(): void {
    this.user = this._userService.getUser();
  }

  // --------------------------------------------------------------------------------------------------------------------------------
  // * Edit User

  editedUser = new User();
  showAdminPopup: boolean = false;

  editUser(user: User) {
    this.editedUser = { ...user };
    this.openAdminPopup();
  }

  updateUser(updatedUser: User) {
    this._userService.updateUserDetails(updatedUser).subscribe(
      (response) => {
        console.log("User updated successfully:", response);
        this._userService.setUser(updatedUser);
        this.user = this._userService.getUser();
      },
      (error) => {
        console.error("Error updating user:", error);
      }
    );
    this.closeAdminPopup();
  }

  openAdminPopup() {
    this.showAdminPopup = true;
  }

  // Method to close the admin pop-up
  closeAdminPopup() {
    this.showAdminPopup = false;
  }
}
