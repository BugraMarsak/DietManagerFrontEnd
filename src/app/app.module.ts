import {  HttpClientModule } from '@angular/common/http';

import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavComponent } from './components/nav/nav.component';

import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { DietListMakerComponent } from './components/diet-list-maker/diet-list-maker.component';
import { ClientDatasComponent } from './components/client-datas/client-datas.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllergiesComponent } from './components/allergies/allergies.component';
import { ProfileComponent, DialogContentExampleDialog } from './components/profile/profile.component';

import { ClientfilterPipe } from './pipe/clientfilter.pipe';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { UpdateDefaultDataComponent } from './components/update-default-data/update-default-data.component';
import { MatDialogModule} from '@angular/material/dialog';
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    AppointmentListComponent,
    ClientListComponent,
    ClientDetailsComponent,
    DietListMakerComponent,
    ClientDatasComponent,
    RegisterComponent,
    AllergiesComponent,
    ProfileComponent,
    ClientfilterPipe,
    UpdateDefaultDataComponent,
    DialogContentExampleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PlotlyModule,
    MatDialogModule
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
