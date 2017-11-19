import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesService } from "./services/movies.service";
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    PlayerComponent
  ],
  imports: [
    HttpModule,
    BrowserModule
  ],
  providers: [ 
    MoviesService 
  ],
  bootstrap: [ 
    AppComponent
  ]
})
export class AppModule { }
