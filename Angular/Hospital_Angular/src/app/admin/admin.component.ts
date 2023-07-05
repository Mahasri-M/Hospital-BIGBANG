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
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { PopadminComponent } from '../popadmin/popadmin.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    

    constructor(private registrationService: SignupService,private http: HttpClient,private router :Router , private signupService : SignupService, private fb:FormBuilder,private dialog: MatDialog) {
    }
    formDetails: any;
    showFormDetails = true;
    approveId !:number;
    Dummy !: any;
    dum: any;
    ngOnInit():void{
      this.getDummyDetails();
      this.registrationService.formDetails$.subscribe(details => {
        this.formDetails = details;
        this.showFormDetails = !!this.formDetails;
      });
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
      const { approveId, ...dum1 } = dum;
      dum1.hashKey="";
      dum1.password="";
      
      this.registrationService.approveStaff(dum1).subscribe(data =>{
          // const formData = this.pdfview.value;
          const mailtoLink = `mailto:${dum1.email}?subject=Approval Details&body=Dear ${dum1.name},%0D%0A%0D%0AWe are writing to inform you that your request has been Approved.%0D%0A%0D%0ABest regards,%0D%0AYour Organization`;
          window.location.href = mailtoLink;
         console.log("success");
      })
      this.registrationService.DeleteProduct(dum.approveId).subscribe(
     
        (result) => {  const dialogRef = this.dialog.open(PopadminComponent, {
          width: '400px',
          data: {
            message: "Doctor Approved!"
          }
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'admin') {
            this.router.navigateByUrl('admin');
          }
        });},
        (error)  => {
          alert("Error");
          }
      )
      dum.approved = true;

    }

    public Decline(dum:any){

      this.registrationService.DeleteProduct(dum.approveId).subscribe(
        
     
        (result) => { const mailtoLink = `mailto:${dum.email}?subject=Approval Details&body=Dear ${dum.name},%0D%0A%0D%0AWe are writing to inform you that your request has been Rejected.%0D%0A%0D%0ABest regards,%0D%0AYour Organization`;
        window.location.href = mailtoLink;
        const dialogRef = this.dialog.open(PopadminComponent, {
          width: '400px',
          data: {
            message: "Doctor Rejected!"
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'admin') {
            this.router.navigateByUrl('admin');
          }
        });}
     ,
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