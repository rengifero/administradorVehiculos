import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from './../../shared/authentication-service.service';
import { ModalComponent } from './../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { NgAuthService } from "../../ng-auth.service";
import { toArray } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent  {
  isActive = false;
  public valorEmitido ;
  public send ="hola munod";
  public aSubscription
  public sub$: Observable<string[]>;
  public  autoId;

  constructor(public ngAuthService: NgAuthService,
    public dialog: MatDialog,
    public authenticationService: AuthenticationServiceService,
    private router: Router,
    public rutaActiva: ActivatedRoute

   ) { 
   this.sub$ = this.authenticationService.getBuscaObservable().pipe(toArray());
  //this.valorEmitido = this.authenticationService.validatorFunction;

 /*  this.aSubscription = this.authenticationService.validarFunction()
  .subscribe((data)=>{
   
      console.log("estas: "+data);
      this.valorEmitido = data;
});
 */
console.log("aja; "+authenticationService.validatorSend);
if (!authenticationService.validatorSend){
  console.log("entra por aqui");
  router.navigate(['/login']);

}
/* 

this.autoId = this.rutaActiva.snapshot.paramMap.get("autoId");
console.log("autoId: "+this.autoId); */

   }

 
  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: "450px",
      height: "380px",
      autoFocus: false,
    });
  } 

}
