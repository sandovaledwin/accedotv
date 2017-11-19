import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private showMovies : boolean = true;
  private showPlayer : boolean = false;
  private movieToPlay: String  = '';
  private picture    : String  = '';
  private title      : String  = 'app';

  constructor(){
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
    this.showMovies  = true;
    this.showPlayer  = false;    
  }
}
