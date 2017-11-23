import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private showMovies  : boolean = false;
  private showPlayer  : boolean = false;
  private showHistory : boolean = false;
  private movieToPlay : String  = '';
  private movieTitle  : String  = '';
  private picture     : String  = '';
  private title       : String  = 'app';
  private username    : String  = '';
  private showLogout  : boolean = false;
  private items       : Array<String> = [];

  constructor( private authService: AuthService, private db: AngularFirestore ) {

    this.isLogged();

  }

  isLogged() : void {

    this.authService.getLoginState().subscribe(
      ( auth ) => {
        
        console.log( auth );

        this.username    = '';
        this.showMovies  = false;
        this.showLogout  = false;
        this.showPlayer  = false; 
        this.showHistory = false;       

        if( auth ){
          this.username    = auth.displayName;
          this.showMovies  = true;
          this.showLogout  = true;
        }
        
      }      
    );

  }

  login( authType : String ) {

    this.authService.login( authType ).then(
      ( data ) => {
        console.log( data.user.displayName );
        console.log( this );
        this.username    = data.user.displayName;
        this.showMovies  = true;
        this.showLogout  = true;
      }
    ).catch( ( error ) => { console.log( error); } );    

  }

  logout() {
    this.authService.logout().then(
      ( data ) => {
          this.showMovies  = false;
          this.showPlayer  = false;
          this.showHistory = false;
      }
    );
  }

  moviePlay( movie ) : void {
    console.log( "Playing Movie: " );
    console.log( movie.title );
    console.log( "URL: " );
    console.log( movie.contents[ 0 ].url );
    console.log( "Poster: " );
    console.log( movie.images[ 0 ].url );
    if( movie ){
      this.movieToPlay = movie.contents[ 0 ].url || '';
      this.movieTitle  = movie.title || '';
      this.picture     = movie.images[ 0 ].url || '';
      this.showMovies  = false;
      this.showHistory = false;
      this.showPlayer  = true;
    }    
  }

  openHistory() : void {
    this.movieToPlay = '';
    this.movieTitle  = '';
    this.picture     = '';    
    this.showMovies  = false;
    this.showHistory = true;
    this.showPlayer  = false;    
  }

  goHome(){

    console.log( "Go Home .." );
    
    this.isLogged();

  }
}
