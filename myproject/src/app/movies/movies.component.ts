import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  @Output()
  movieSelected: EventEmitter<object> = new EventEmitter<object>();    

  private _movies : any;

  constructor( private _moviesService : MoviesService ) { 

  }

  ngOnInit() : void {

    this._moviesService.getList()
    .subscribe(
         response => { this._movies = response.entries; },
         error    => console.log( error ) );    

  }

  openMovie( movie ) : void {

    console.log( movie );

    this.movieSelected.emit( movie );
    
  }

}
