import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupService } from './service/signup.service';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { PopupComponent } from './popup/popup.component';
import { ImageComponent } from './image/image.component';
import { AdminComponent } from './admin/admin.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { BookingComponent } from './booking/booking.component';
import { PatientComponent } from './patient/patient.component';
import { ManageComponent } from './manage/manage.component';
import { PoppdfComponent } from './poppdf/poppdf.component';
import { RequestComponent } from './request/request.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ImgComponent } from './img/img.component';
import { PopadminComponent } from './popadmin/popadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomepageComponent,
    AdminpageComponent,
    PopupComponent,
    ImageComponent,
    AdminComponent,
    AppointmentComponent,
    BookingComponent,
    PatientComponent,
    ManageComponent,
    PoppdfComponent,
    RequestComponent,
    HeaderComponent,
    FooterComponent,
    ImgComponent,
    PopadminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    AppRoutingModule
  ],
  providers: [SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
