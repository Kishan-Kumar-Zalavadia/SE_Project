import { Component } from "@angular/core";
import { RegistrationService } from "../../services/registration/registration.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user-service/user.service";
import { User } from "../../models/user/user";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  constructor(
    private _service: RegistrationService,
    private _router: Router,
    private _userService: UserService
  ) {}

  user = new User();

  ngOnInit(): void {
    this.user = this._userService.getUser();
  }
}
