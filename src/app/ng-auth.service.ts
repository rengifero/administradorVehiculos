
import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { map, filter, switchMap } from 'rxjs/operators';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
 }

@Injectable({
  providedIn: 'root'
})

export class NgAuthService {
    userState: any;
    date: Date;
    constructor(
      public afs: AngularFirestore,
      public afAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone
    ) {

      this.date = new Date();
      this.afAuth.authState.subscribe(user => {
        if (user) {
          console.log("usr valid");
          console.log(this.date.toLocaleString());
     
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
          JSON.parse(localStorage.getItem('user'));
        } else {
          console.log("usr In-valid");
          console.log(this.date.toLocaleString());
       
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
    }
  
    SignIn(email, password) {
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          console.log("sign-in");
          console.log(this.date.toLocaleString());
       
          this.SetUserData(result.user);
          console.log(this.date.getTime());
          this.ngZone.run(() => {
            this.router.navigate(['login']);
          });
         
          console.log(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }
  
    SignUp(email, password) {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.SendVerificationMail();
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }

    SendVerificationMail() {
        return this.afAuth.currentUser.then(u => u.sendEmailVerification())
        .then(() => {
          this.router.navigate(['email-verification']);
        })
    }    
  
    ForgotPassword(passwordResetEmail) {
      return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
    }
  
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'))
            console.log("isLoggedIn()");
      console.log(user);
try {
      return (user !== null || user.emailVerified !== false) ? true : false;
    
}catch (err){
  console.error("sucedio un error");
}    
    }
  
    GoogleAuth() {
      return this.AuthLogin(new auth.GoogleAuthProvider());
    }
  
    AuthLogin(provider) {
      return this.afAuth.signInWithPopup(provider)
      .then((result) => {
         this.ngZone.run(() => {
            this.router.navigate(['dashboard']);
          })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
    }
  
    SetUserData(user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userState: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }
      return userRef.set(userState, {
        merge: true
      })
    }
   
  // Check user status
  getAuth() {
    // returns an observable to get a user data - wether the user is logged in or not
    return this.afAuth.authState.pipe(map((response: any) => response)); 
    //.map(auth => auth);
  }

    SignOut() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);


        /* singOut */
      // remove user from local storage to log user out
      localStorage.removeItem('user');
      //this.userSubject.next(null);
      this.router.navigate(['/login']);
    localStorage.clear();


      })
    }  
}