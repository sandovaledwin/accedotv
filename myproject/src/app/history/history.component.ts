import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService      } from '../services/auth.service';
import { MoviesService    } from '../services/movies.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @Output()
  movieSelected: EventEmitter<object> = new EventEmitter<object>();   

  private monitoringChanges : any; 
  private historyRecords    : Array<object> = [];
  private movies            : any;

  constructor(  
    private moviesService : MoviesService,             
    private authService: AuthService, 
    private db: AngularFirestore ) { }

  ngOnInit() {

    this.authService.getLoginState().subscribe(
      ( auth ) => {
        
        console.log( "User: " );
        console.log( auth );       

        if( auth ){          
          
          this.getListOfMovies();

          this.getHistory( auth.email );

        }
        
      }      
    ); 

  }

  getHistory( user : string ) : void {
    
    this.monitoringChanges = this.db.collection( 'history' ).doc( user ).valueChanges().subscribe(
      ( data ) => {

        if( data ){

          this.historyRecords = [];

          Object.keys( data ).map( 
            key => {

              let objRecord = data[ key ];

              console.log( "Content: ", objRecord );
              console.log( objRecord.length );

              if( objRecord.length >= 10 ){
                objRecord.shift();
              }

              objRecord.forEach( element => {
                this.historyRecords.push( element );
              });

              this.historyRecords.reverse();

            }
          );

        }
        
      },
      ( err ) => {
        console.log( err );
      }
    );
    
  }
  
  getListOfMovies() : void {

    this.moviesService.getList()
    .subscribe(
         response => { 
          
          console.log( "Sharing Movie List: ", response.entries );
          
          this.movies = response.entries; 
        
         },
         error    => console.log( error ) );    


  }

  openMovie( movieId : String ) : boolean {

    console.log( "History - Opening the movie: ", movieId );

    let movieSelected = this.movies.find( movie => movie.id === movieId );

    console.log( movieSelected );

    this.movieSelected.emit( movieSelected );

    return false;

  }

  getMovieInfo( movieId : String ) : string {

    let movie = this.movies.find( movie => movie.id === movieId );

    return movie; 

  } 

  formatDate( date : Date ) : string {
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    let day        = date.getDate();
    let monthIndex = date.getMonth();
    let year       = date.getFullYear();
    let hours      = date.getHours();
    let minutes    = date.getMinutes();
    let seconds    = date.getSeconds();
  
    return day + ' ' + 
           monthNames[monthIndex] + ' ' + 
           year + ' ' + 
           hours + ':' + 
           minutes + ':' + 
           seconds;
  }  

}
