import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor( public afAuth: AngularFireAuth ) { }

  getLoginState(){
    return this.afAuth.authState;
  }

  login( authType : String ) {

    if( authType === "google" ){
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider() );
    }

    if( authType === "github" ){
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider() );
    }    

    if( authType === "twitter" ){
      return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider() );
    }        

    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider() );

  }
  logout() {
    return this.afAuth.auth.signOut();
  }

}
