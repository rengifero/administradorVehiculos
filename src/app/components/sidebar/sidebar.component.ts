import { ProviderService } from './../../shared/provider.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {  Router } from '@angular/router';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  subscription: Subscription;
  public autoId: string;
  mensajeGoku: string;

  constructor(
              private providerService : ProviderService,
              public router: Router

  ) { 


    // subscribe to product component
this.subscription = this.providerService.getMessage().subscribe(message => {
 
  console.log("message de goku : "+message);
  this.autoId = message;

 
  });


    // take es un operador que hará que solo obtengamos el último valor
    // que tiene bulma$ almacenado. Si no lo usamos, cuando enviemos un mensaje
    // de cualquiera de los dos componentes, se mostrará automaticamente
    // en el que ya haya visto un mensaje anteriormente.
    this.providerService.bulma$.pipe(take(1))
      .subscribe(mensaje => this.mensajeGoku = mensaje);
  
  console.log(this.mensajeGoku);

  }

  ngOnInit(): void {



  }

send(){

  console.log("hola mindo");

  console.log("hola : "+this.autoId);




  this.providerService.bulma$.pipe(take(1))
  .subscribe(mensaje => this.mensajeGoku = mensaje);

console.log(this.mensajeGoku);



    //  this.router.navigate(['/add-auto'], { queryParams: { userId: this.mensajeGoku  } });
    this.router.navigate(['/add-auto',this.mensajeGoku,this.mensajeGoku] );


}


}
