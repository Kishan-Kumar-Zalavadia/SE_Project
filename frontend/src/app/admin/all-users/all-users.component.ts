import { Component } from "@angular/core";
import { User } from "src/app/models/user/user";
import { UserService } from "src/app/services/user-service/user.service";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.scss"],
})
export class AllUsersComponent {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
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
    this.userService.updateUserDetails(updatedUser).subscribe(
      (response) => {
        console.log("User updated successfully:", response);
        this.loadUsers();
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
