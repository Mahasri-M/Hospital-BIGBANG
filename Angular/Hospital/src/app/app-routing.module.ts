import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { ImageComponent } from './image/image.component';
import { AdminComponent } from './admin/admin.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { BookingComponent } from './booking/booking.component';
import { PatientComponent } from './patient/patient.component';
import { ManageComponent } from './manage/manage.component';
import { RequestComponent } from './request/request.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ImgComponent } from './img/img.component';


const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'admin',component:AdminComponent},
  {path:'login',component:LoginComponent},
  {path:'homepage',component:HomepageComponent},
  {path:'image',component:ImageComponent},
  {path:'appointment',component:AppointmentComponent},
  {path:'booking',component:BookingComponent},
  { path: 'booking/:doctorId', component: BookingComponent },
  {path:'patient',component:PatientComponent},
  {path:'manage', component:ManageComponent},
  {path:'request',component:RequestComponent},
  {path:'header',component:HeaderComponent},
  {path:'footer',component:FooterComponent},
  {path:'img',component:ImgComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
