import { Vitacora } from './../../model/autos';
import { map } from 'rxjs/operators';
import { ProviderService } from './../../shared/provider.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-autos-admin',
  templateUrl: './autos-admin.component.html',
  styleUrls: ['./autos-admin.component.css']
})
export class AutosAdminComponent implements OnInit {

  autos: any;
  clients: any[];
  totalOwed: number;
   index: any;
   public vitacora : Vitacora[];
   public param ;
   public iglesia;
   public marca;
   public user;
 
   public incremental=[0,1,2];
  constructor(public autosService: ProviderService,
                    private route: ActivatedRoute,
                    public router: Router
                  ) {
    
    
   }

  ngOnInit(): void {
  
    this.retrieveVitacota();
    
  }

  retrieveVitacota(): void {
this.route.params.subscribe(
  (params: Params) => {
    this.param = params['autoId'];
    this.iglesia = params['iglesia'];
    this.marca = params['marca'];
    this.user = params['user'];
    
    //this.coche.marca = params.marca;
    console.log("autoId: "+this.param);

    this.autosService.enviar((this.param));
    
  }
);


    this.autosService.getBitacoraAuto(this.param).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      let incremental1=[];
     
      this.vitacora = data;
      this.incremental=[];
      let y=0;

    this.vitacora.forEach( function (value){
     
      let costoTotal =0;
         
      for (let x =0; value.itemRows[x];x++)
      costoTotal= costoTotal + parseInt(value.itemRows[x].costo);
       incremental1[y] =costoTotal;

       console.log(incremental1[y]);     
       y++;
     
   return;
   
  });

  this.incremental  =incremental1;
    });

}
     public detalles (id){

/*         console.log(id);
        console.log(this.vitacora[id]);
 */

      
       // this.router.navigate(["/detalles"],  navigationExtras);

        
         //this.router.navigate(['/detalles/' + this.vitacora[0].itemRows]);

         this.router.navigate(['/detalles/' +id ]);
       //this.router.navigate(['/detalles']);
      }

}


