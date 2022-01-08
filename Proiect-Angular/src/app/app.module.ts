import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import {} from "googlemaps";

@NgModule({
  declarations: [		
    AppComponent,
      ValueComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
