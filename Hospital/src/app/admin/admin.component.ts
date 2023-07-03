// import { Component, OnInit } from '@angular/core';
// import { SignupService } from '../service/signup.service';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-admin',
//   templateUrl: './admin.component.html',
//   styleUrls: ['./admin.component.css']
// })
// export class AdminComponent implements OnInit{

//   constructor(private service:SignupService, private router:Router){}

//   ngOnInit(): void {
//    this.getDoctorRequest();
//   }

//   public doctors: any;

//   getDoctorRequest()
//   {
//     this.service.getDoctorRequest().subscribe(result=>{
//       this.doctors = result;
//       // console.log(this.doctors);
//     })
//   }

//   acceptDoctorRequest(doctor:any)
//   {
//     //alert("entered")
//     console.log(doctor);
//     doctor.password="";
//     doctor.hashKey="";
//     this.service.approveStaff(doctor).subscribe(data => { console.log("Staff Register") ;
//         setTimeout(() => {
//           this.router.navigate(['login']);
//         }, 3000);},
//         err => {
//           console.log(err)
//         });
//          alert("request Approved");

//          this.service.DeleteProduct(doctor.id).subscribe(
  
//           (result) => { alert("Staff Deleted");},
//           (error)  => {
//             alert("Error");
//             }
//         )
//  }

//  deleteDoctorRequest(doctor:any)
//  {
//   this.service.DeleteProduct(doctor.id).subscribe(

//     (result) => { alert("Staff Deleted");},
//     (error)  => {
//       alert("Error");
//       }
//   )
//   this.router.navigate(['login']);
//  }
// }
import { Component } from '@angular/core';

import { registerModel} from '../../app/register/model/register.model';
import { SignupService } from '../service/signup.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    

    constructor(private registrationService: SignupService) {
    }

 
    id !:number;
    Dummy !: any;

    ngOnInit():void{
      this.getDummyDetails();
    }

    public getDummyDetails():void{
      this.registrationService.getDoctorRequest().subscribe(ress =>{
        this.Dummy = ress
        console.log(this.Dummy);
      }
      )
    }

    public Approve(dum:any){

      console.log(dum);
      const { id, ...dum1 } = dum;
      dum1.hashKey="";
      dum1.password="";
      
      this.registrationService.approveStaff(dum1).subscribe(data =>{
         console.log("success");
      })
      this.registrationService.DeleteProduct(dum.id).subscribe(

        (result) => { alert("Doctor Deleted");},
        (error)  => {
          alert("Error");
          }
      )

    }

    public Decline(dum:any){

      this.registrationService.DeleteProduct(dum.id).subscribe(
        // res=>{
        //   alert("deleted")
        // }
        (result) => { alert("Staff Deleted");},
        (error)  => {
          alert("Error");
          }
      )
      // this.Dummy=this.Dummy.filter((dum:any) => dum.id !== id);
      // this.registrationService.DeleteDoctorById(this.id)
      // .subscribe( 
      //   result => {
      //     alert('Deleted'); // Set the add hotel alert message
      //   }
      //   );
      }

}
// export class Model
// {

//          id:number;
//          email:string="";
//          firstName: string="";
//          lastName: string="";
//          gender: string="";
//          role: string="";
//          password: string="";
//          hashKey: string="";
//          passwordClear: string="";
//          depName: string="";
//         availableStatus:boolean=true;

// }