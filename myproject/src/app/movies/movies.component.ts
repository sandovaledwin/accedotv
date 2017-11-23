import { element } from 'protractor';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MoviesService    } from '../services/movies.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService      } from '../services/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  @Output()
  movieSelected: EventEmitter<object> = new EventEmitter<object>(); 
  monitoringChanges : any;   

  private _movies : any;

  constructor( 
              private _moviesService : MoviesService,
              private authService: AuthService, 
              private db: AngularFirestore 
             ) { }

  ngOnInit() : void {

    this._moviesService.getList()
    .subscribe(
         response => { this._movies = response.entries; },
         error    => console.log( error ) );    

  }

  openMovie( movie ) : void {

    console.log( "Movie selected: " );
    console.log( movie );

    this.authService.getLoginState().subscribe(
      ( auth ) => {
        
        console.log( "User: " );
        console.log( auth );       

        if( auth ){          
          
          this.getAllHistory( auth.email, movie.id );

        }
        
      }      
    ); 

    this.movieSelected.emit( movie );
    
  }

  getAllHistory( user : string, movieId : string ) : void {

    this.monitoringChanges = this.db.collection( 'history' ).doc( user ).valueChanges().subscribe(
      ( data ) => {

        let history = [];

        let newRecord = {
          "movieId" : movieId,
          "date"    : new Date()
        };

        console.log( "validando user" );
        console.log( data );    
        console.log( newRecord );          

        if( data ){

          Object.keys( data ).map( 
            key => {

              let objRecord = data[ key ];

              console.log( "Content: ", objRecord );
              console.log( objRecord.length );

              if( objRecord.length >= 10 ){
                objRecord.shift();
              }

              objRecord.forEach( element => {
                history.push( element );
              });

            }
          );

        }

        history.push( newRecord );
        
        this.addNewHistory( user, history );
        
      },
      ( err ) => {
        console.log( err );
      }
    );

  }

  addNewHistory( user : string, history : Array<object> ) : void {

    this.monitoringChanges.unsubscribe();

    this.db.collection( 'history' ).doc( user ).set({
      "history": history
    }).then(function() {
        console.log("Document successfully written!");
    }).catch(function(error) {
        console.error("Error writing document: ", error);
    });

  }

}
