import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';

@Injectable()
export class MoviesService {

  private _data      : Observable<any>;
  private _host      : String = "https://demo2697834.mockable.io/";  

  constructor( private http : Http ) { 

  }

  getList() : Observable<any>{

    if( !this._data ){

      this._data =  this.http.get( this._host + "movies" )
                    .map(   ( res:Response ) => res.json() )
                    .catch( ( error:any    ) => Observable.throw( error.json().error || 'Server error' ) );
                    
    }

    return this._data 

  }

}
