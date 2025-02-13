import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';
import { map } from 'rxjs/operators';
import { ProviderService } from './../../shared/provider.service';
import { Component, OnInit } from '@angular/core';
import Autos from '../../model/autos';


@Component({
  selector: 'app-autos-list',
  templateUrl: './autos-list.component.html',
  styleUrls: ['./autos-list.component.css']
})
export class AutosListComponent implements OnInit {
  autos: Autos[];
  clients: any[];
  totalOwed: number;
   index: any;
   public param ;

  constructor(public autosService: ProviderService,
    public dialog: MatDialog) {
    
    console.log("localStorage.getItem('administrador') :" +localStorage.getItem('administrador'));
   }

  ngOnInit() {
   /*  this.autosService.getAutos().subscribe(
      clients => {
        this.clients = clients;
        // console.log(this.clients);
        this.getTotalOwed(); 
      });
      */
    this.index = 0;
     this.retrieveTutorials();



  }

  getTotalOwed():any {
    let total = 0;
    // Loop through clients
    for(let i = 0;  i < this.autos.length; i++) {
        //total += parseFloat(this.clients[i].balance);
        total =+1 ;
    }
    this.totalOwed = total;
    console.log(this.totalOwed);
    return total;
  }



  retrieveTutorials(): void {
    this.autosService.getAutos().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.autos = data;

    // send product data to subscribers via observable subject
    //this.autosService.addToMessage(this.autos[0]);

    
    });
}


 
 openDialog() :void{
  const dialogRef = this.dialog.open(ModalComponent, {
    width: "450px",
    height: "380px",
    autoFocus: false,
  });


} 


}
