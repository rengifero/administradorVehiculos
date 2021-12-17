import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgAuthService } from "./ng-auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
 
  date: Date;
  constructor(
    public ngAuthService: NgAuthService,
    public router: Router
  ){

   this.date = new Date();
     }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.date.toLocaleString());
       console.log("valida canActive");   
      //console.log(this.ngAuthService.isLoggedIn);
       
      if(this.ngAuthService.isLoggedIn !== true||this.ngAuthService.isLoggedIn == null) {
        console.log("primera validacion");
             console.log(this.ngAuthService.isLoggedIn);
        this.router.navigate(['sign-in'])
      }
      return true;
  }
  
}