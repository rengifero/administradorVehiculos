import { NgAuthService } from './../../ng-auth.service';
import { AuthenticationServiceService } from './../../shared/authentication-service.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

//import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;

  // setting to enable the registration
  showRegister: boolean;

  constructor(
              private router: Router,
              //private authService: AuthenticationServiceService,
              private authService: NgAuthService,
             // public settingsService: SettingsService,
              private toastr: ToastrService ,
              ) { }

  ngOnInit() {
    this.isLoggedIn = true;

console.log("entra suscribe");

    this.authService.getAuth().subscribe(auth => {
      // If user is logged in
      if (auth) {

          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

  //  this.showRegister = this.settingsService.getSettings().allowRegistration;
  
  
  }

  onLogoutClick() {
    this.authService.SignOut();
  //  this.flashMessagesService.show('You are logged out', {cssClass: 'alert-success', timeout: 4000});
    this.toastr.success('New event is added','',
     { timeOut: 4000});

    // Navigate to login page
    this.router.navigate(['/login']);
  }

}
