import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  private _movies : any;

  constructor( private _moviesService : MoviesService ) { 

  }

  ngOnInit() {

    this._moviesService.getList()
    .subscribe(
         response => { this._movies = response.entries; },
         error    => console.log( error ) );    

  }

}
