import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor( public afAuth: AngularFireAuth ) { }

  getLoginGoogleState(){
    return this.afAuth.authState;
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logoutWithGoogle() {
    return this.afAuth.auth.signOut();
  }

}
