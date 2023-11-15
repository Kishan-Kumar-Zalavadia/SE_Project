import { Component, OnInit } from "@angular/core";
// * 2. from 'app/modules.ts' -> import NgForm to use ngForm
import { NgForm } from "@angular/forms";
import { RegistrationService } from "../services/registration/registration.service";
import { User } from "../models/user/user";
import { Router } from "@angular/router";
import { UserService } from "../services/user-service/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user = new User();
  errorMsg = "";
  constructor(private _service: RegistrationService, private _router: Router, private _userService: UserService) {}

  ngOnInit(): void {
    
  }

  loginUser() {
    this._service.loginUserFromRemote(this.user).subscribe(
      (data) => {
        console.log(data);
        this._userService.setUser(data);
        if(this.user.emailId == 'admin@gmail.com') {
          this._router.navigate(['/home/allUsers']);
        }
        else
          this._router.navigate(['/home/buy']);
        // this._router.navigate(["/home"], {
        //   skipLocationChange: true,
        // });
      },
      (error) => {
        console.log("Exception Occured:" + error);
        this.errorMsg = "Bad Credentials, please try again";
      }
    );
  }

  gotoRegistration() {
    this._router.navigate(["/registration"]);
  }
}
