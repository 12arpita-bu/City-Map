import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import {DropdownModule} from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityTableComponent } from './city-table/city-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './data-service.service';

@NgModule({
  declarations: [
    AppComponent,
    CityTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
