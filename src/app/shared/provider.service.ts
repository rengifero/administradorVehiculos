import { Subject, Observable, BehaviorSubject, of } from 'rxjs';
import { Vitacora } from './../model/autos';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import Autos from '../model/autos';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
//autos: AngularFirestoreDocument<any>;

    private subject = new Subject(); 
    private dbPath = '/altaAutos';
    private dbPath2 = '/altaEventsAuto';
public  administrador;
    autosRef: AngularFirestoreCollection<Autos> = null;
    autosRef2: AngularFirestoreCollection<FormGroup> = null;
    autosRef3: AngularFirestoreCollection<Vitacora> = null;
  //  autosRef4: AngularFirestoreDocument<any> = null;
    
    private bulma = new BehaviorSubject<string>('');
  
   // private itemDoc: AngularFirestoreDocument<any>;
    item: Observable<any>;

  constructor(   private firestore: AngularFirestore,
            //     private afd: AngularFirestoreDocument,
                 private toastr: ToastrService   ) {
    // Fetch autos from database
// db: AngularFireStore
//this.autos = firestore.doc('altaAutos');
// or



this.autosRef2 = firestore.collection(this.dbPath2);
}

getAll(): AngularFirestoreCollection<Autos> {
  return this.autosRef;
}



getBitacoraAuto(id:string){
  this.autosRef3 = this.firestore.collection(this.dbPath2, ref => ref.where('autoId', '==',id));

  return this.autosRef3;

}

    createNewAuto(data) {
      return new Promise<any>((resolve, reject) =>{
          this.firestore
              .collection("altaAutos")
              .add(data)
              .then(res => {
                resolve('Success!');
          }, err => reject(err));
      });
    }


      getAutos(): AngularFirestoreCollection<Autos> {
      this.administrador = localStorage.getItem('administrador');
      console.log("this.administrador :"+this.administrador);
        this.autosRef = this.firestore.collection(this.dbPath, ref => ref.where('administrador', '==' ,this.administrador ));
        return this.autosRef;
      }


      newClient(auto: Autos) {
        // Pushing Client object to clients which is a FirebaseListObservable
      //  this.autosRef2.add(auto);
      }


      newEvent(formG: FormGroup) {
        // Pushing Client object to clients which is a FirebaseListObservable
        this.autosRef2.add(formG);
      }


      showSuccess(message, title){
        this.toastr.success(message, title)
    }

/*  entrega mensaje para sidebar component*/

      addToMessage(product:string) {
      this.subject.next({name:product});
      }
      
      clearMessage() {
      this.subject.next();
      }
      
      getMessage(): Observable<any>{
        return this.subject.asObservable();
        }
       
        // No se utiliza directamente el BehaviorSubject (buena practica)
  // Se canaliza su uso a través de un observable que será público.
  // Este observable llamará quién quiera ver el último mensaje que se dejó.
  bulma$ = this.bulma.asObservable();

   // Almacenar mensaje, listo para mostrarlo a quién lo pida.
   enviar(mensaje) {
    // function que llamará quien quiera transmitir un mensaje.
    this.bulma.next(mensaje);
    }
    getBitacoraAutoDetalles(id: string){

      console.log("_id: "+id);
      this.autosRef3 = this.firestore.collection(this.dbPath2 );

      return this.autosRef3;
  
 
    }

    deleteClient(id: string) {

      const tutorialsRef = this.firestore.collection(this.dbPath2);
      tutorialsRef.doc(id).delete();
  
    }

}
