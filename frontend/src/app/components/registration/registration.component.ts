import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { RegistrationService } from "../../services/registration/registration.service";
import { User } from "../../models/user/user";
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  user = new User();
  msg = "";
  constructor(private _service: RegistrationService, private _router: Router) {}

  ngOnInit() {}

  registerUser() {
    this._service.registraterUserFromRemote(this.user).subscribe(
      (data) => {
        console.log("Responce recived" + this.user.id);
        this.msg = "Registration Successful";
      },
      (error) => {
        console.log("Exception occured");
        // this.msg=error.msg;
        this.msg = "User Already Exists";
      }
    );
  }
}
