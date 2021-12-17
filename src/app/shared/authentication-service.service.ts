import { NgAuthService } from './../ng-auth.service';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of, ReplaySubject, from } from 'rxjs';
import { map, switchMap, find } from 'rxjs/operators';


import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private userSubject: BehaviorSubject<User>;
    public user: Subject<any>;
    public  users: Array<any> =[];
    public _localVar= [];
    flag: Boolean;
    public validatorParam : ReplaySubject<string>;
     validatorSend: any;
      
    constructor(
      private router: Router,
      private http: HttpClient,
      private firestore: AngularFirestore,
      private ngAuth: NgAuthService

  ) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      //this.user = this.userSubject.asObservable();
        const docRef =  firestore.collection("altaAutos").get();

         this.validatorSend =null;
    }

  public get userValue(): User {
      return this.userSubject.value;
  }

  login(username: string, password: string) {
    
    let _localVar1= [];
    let x: string;
    
     /*  return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
              return user;
          })); */
          


/* ejemplo de find() operator */
// const user: any = Object.values(USERS).find(user => user.email === email);

/* this.exampleGetDocument().pipe(
    map(changes =>
    changes.map(c =>{
      ({ id: c.payload.doc.id, data: c.payload.doc.data() })
            console.log("result: "+c.payload.doc.data());    }

    )
  )
).subscribe(data => {
  this.users = data;
  });   */        
        this.exampleGetDocument().subscribe((usersSnapshot) => {
          usersSnapshot.forEach((user: any) => {
            
              _localVar1 = user.payload.doc.data();
              //console.log(user.payload.doc.id);
            //  console.log(user.payload.doc.data());
            
            this._localVar = JSON.parse(JSON.stringify(_localVar1));
                    // console.log("_localVar :"+JSON.stringify(this._localVar));
                  })
        /*reset state session var   */
        localStorage.removeItem('userAutosSion');
                    
                    for (let i in this._localVar) {
                       this.users.push([this._localVar[i].user_iglesia_id]);
                      this.users.push([this._localVar[i].user_password]);
                      }
               
                              /*  const tempo: any =  JSON.stringify(Object.values(this.users).find(user =>user==username));
                              if (tempo)
                               console.log(tempo) */

                               

                    for (let i in this._localVar) {
                        if ((this._localVar[i].hasOwnProperty('user_iglesia_id'))&& (this._localVar[i].user_iglesia_id=== username)) {
                              if(this._localVar[i].user_password === password){
                                console.log(this._localVar[i].user_password);
                                localStorage.setItem('userAutosSion', 'true');
                                localStorage.setItem('administrador',this._localVar[i].user_iglesia_id);
                           this.flag= true;
                          // this.validatorParam.next(this._localVar[i].user_iglesia_id);
                           this.validatorSend =this._localVar[i].user_iglesia_id;

                              }else{  localStorage.removeItem('userAutosSion');
                            
                              this.flag= false;
                            } 
                        }
                     }

                
        });
        return this.flag;
      }
        
      public validarFunction(){

        return from (this.validatorSend);
      }

      public getBuscaObservable(): Observable<any> {
        return  of(this.validatorSend );
      }
      

 public exampleGetDocument(){ 
    return this.firestore.collection('permisos').snapshotChanges();
   
}



  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/login']);
    localStorage.clear();

    this.ngAuth.SignOut();
    }
}
