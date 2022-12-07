
import { ProfileComponent } from './components/profile/profile.component';
import { AllergiesComponent } from './components/allergies/allergies.component';
import { DietListMakerComponent } from './components/diet-list-maker/diet-list-maker.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDatasComponent } from './components/client-datas/client-datas.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateDefaultDataComponent } from './components/update-default-data/update-default-data.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:HomeComponent},
  {path:"client/client-list", component:ClientListComponent},
  {path:"client/appointment-list", component:AppointmentListComponent},
  {path:"profile/allergies", component:AllergiesComponent},
  {path:"profile/update-info", component:UpdateDefaultDataComponent},
  {path:"profile", component:ProfileComponent},
  {path:"apointmentlist", component:AppointmentListComponent},
  {path:"profile/datas/", component:ClientDatasComponent},
  {path:"client/client-datas/:clientId", component:ClientDetailsComponent},
  {path:"client/client-details", component:ClientDetailsComponent},
  {path:"DietMaker/:clientId", component:DietListMakerComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
