import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private showMovies : boolean = false;
  private showPlayer : boolean = false;
  private movieToPlay: String  = '';
  private picture    : String  = '';
  private title      : String  = 'app';
  private username   : String  = '';
  private showLogout : boolean = false;

  constructor( public authService: AuthService ) {

    this.isLogged();

  }

  isLogged() : void {

    this.authService.getLoginGoogleState().subscribe(
      ( auth ) => {
        
        console.log( auth );

        this.username    = '';
        this.showMovies  = false;
        this.showLogout  = false;
        this.showPlayer  = false;        

        if( auth ){
          this.username    = auth.displayName;
          this.showMovies  = true;
          this.showLogout  = true;
        }
        
      }      
    );

  }

  login() {
    this.authService.loginWithGoogle().then(
      ( data ) => {
        console.log( data.user.displayName );
        console.log( this );
        this.username    = data.user.displayName;
        this.showMovies  = true;
        this.showLogout  = true;
      }
    );    
  }

  logout() {
    this.authService.logoutWithGoogle().then(
      ( data ) => {
          this.showMovies = false;
          this.showPlayer = false;
      }
    );
  }

  moviePlay( movie, picture ) : void {
    console.log( "Playing Movie: " );
    console.log( movie.contents[ 0 ].url );
    console.log( "Poster: " );
    console.log( movie.images[ 0 ].url );
    if( movie ){
      this.movieToPlay = movie.contents[ 0 ].url || '';
      this.picture     = movie.images[ 0 ].url || '';
      this.showMovies  = false;
      this.showPlayer  = true;
    }    
  }

  goHome(){

    console.log( "Go Home .." );
    
    this.isLogged();

  }
}
