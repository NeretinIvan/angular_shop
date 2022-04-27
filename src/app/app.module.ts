import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundPageComponent } from './ui/not-found-page/not-found-page.component';

import { API_SERVER_PATH } from './domain/tokens';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: API_SERVER_PATH, 
      useValue: "http://localhost:3000"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
