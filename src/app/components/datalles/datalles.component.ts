import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

import { ProviderService } from './../../shared/provider.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Vitacora } from './../../model/autos';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datalles',
  templateUrl: './datalles.component.html',
  styles: [
  ]
})
export class DatallesComponent implements OnInit {

   objectAutoDetalle;
   autoId


   vitacora: Vitacora[];
   temp = '3wc3fSW4SbmGJaszC8va';
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  public data: string;
  passengerData$;
  constructor(
    public providerService: ProviderService,  
              public router: Router,
              public route: ActivatedRoute,
              private toastr: ToastrService 
         
            ) {


             

             this.route.params.subscribe(
              (params: Params) => {
                this.objectAutoDetalle = params['auto-detalle'];
                this.autoId = params['autoId'];
                //this.coche.marca = params.marca;
                console.log("autoIobjectAutoDetalled: "+this.objectAutoDetalle);
              }
            );



             }

  ngOnInit() {

    // Grab the id from URL.   paramMap.get('data');
    
/*     this.route.paramMap.subscribe(params => {
      this.objectAutoDetalle = params.get("detalle-auto")

      console.log("detalles object: "+this.objectAutoDetalle);
    }) */
  
   
  /*  this.route.queryParams.subscribe(params => {
     this.data  = (params['auto-detalle']);
    console.log("detalles object: "+this.data)
  });
 */


/*     for(let i =0; this.vitacora[i];this.vitacora.length){
      console.log(this.vitacora[i]);
      i++;
     }  */




    // Get client
  /*   this.providerService.getBitacoraAutoDetalles(this.data).subscribe(
      client => {

       // this.vitacora = client;

        console.log(client);
      }
    );
 */

this.providerService.getBitacoraAutoDetalles(this.objectAutoDetalle).snapshotChanges().pipe(
  map(changes =>
    changes.map(c =>
      ({ id: c.payload.doc.id, ...c.payload.doc.data() })
    )
  )
).subscribe(data => {
  this.vitacora = data;

  console.log(this.vitacora);
  this.updateBalance(this.objectAutoDetalle);

});

  }

  updateBalance(id: string) {
    // Update client
/*     this.clientService.updateClient(this.id, this.client);

    this.flashMessagesService.show('Balance Updated!', {cssClass: 'alert-success', timeout: 4000});
 */
    // Navigate back to that particular client
   // this.router.navigate(['/client/' + this.id]);


   this.vitacora.forEach( function (value){
      
    if  (value['id'] == id) {
    console.log( "valor", value['id']);
  }
    return;
   });





  }

  onDeleteClick() {
    if (confirm('Are you sure you want to delete this record?')) {
      this.providerService.deleteClient(this.objectAutoDetalle);

      //this.flashMessagesService.show('Client Deleted!', {cssClass: 'alert-success', timeout: 4000});
      this.toastr.success('the record has been deleted','', { timeOut: 4000});
      // Navigate back to dashboard
      this.router.navigate(['/autos-list']);

   }
  }

}
