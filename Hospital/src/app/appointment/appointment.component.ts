import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from '../service/signup.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  flag:boolean = false;
  flaguser:boolean=false;
  doctors: any[] = [];
  specialization: string = '';
 
  doctor: any; 

  constructor(private route: ActivatedRoute,private http: HttpClient, private signupService : SignupService, private router: Router,)
  {
    if (localStorage.getItem("role")=="Doctor")
    {
      this.flag=true;
    }
    if(localStorage.getItem("role")=="User"){
      this.flaguser=true;
    }
  }
  ngOnInit(): void {
    this.getAllDoctors();
  
   this.signupService.getDoctorsBySpecialization(this.specialization)
   .pipe(debounceTime(300))
   .subscribe((data: any) => {
     this.doctors = data;
   });

   const doctorId = this.getDoctorIdFromRoute(); // You need to implement this method to extract the doctorId from the route
   this.signupService.getDoctor(doctorId).subscribe(
     (data: any) => {
       this.doctor = data;
     },
     (error: any) => {
       console.error('Error fetching doctor details:', error);
     }
   );
  }

  bookAppointment(doctorId: number) {
    //const doctorId = this.getDoctorIdFromRoute();
    this.router.navigate(['/booking', doctorId]);
  }
  getDoctorIdFromRoute(): string {
    return this.route.snapshot.paramMap.get('id') || '';
  }
  onInputChange() {
    this.signupService.getDoctorsBySpecialization(this.specialization)
      .pipe(debounceTime(300))
      .subscribe((data: any) => {
        this.doctors = data;
      });
    }
 
  //getdoctor
  // private getDoctors(): void {
  //   this.signupService.getAllDoctors().subscribe(result => {
  //     this.doctors = result;
  //     console.log(this.doctors);
  //   });
  // }

  
  getAllDoctors() {
    this.signupService.getAllDoctors()
      .subscribe((data: any) => {
        this.doctors = data;
      });
  }
  search() {
    this.signupService.getDoctorsBySpecialization(this.specialization)
      .subscribe((data: any) => {
        this.doctors = data;
      });
  }

}
