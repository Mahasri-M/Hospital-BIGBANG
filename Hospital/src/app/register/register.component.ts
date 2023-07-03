import { Component, OnInit, ViewChild } from '@angular/core';
import { LoggedInUserModel } from './model/loggedinuser.model';
import { Router } from '@angular/router';
import { SignupService } from '../service/signup.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
// import validation from '../helper/validation';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('register_form') registerForm: NgForm;
  showError: boolean = false;
  registration_status = false;

  public signup_form!:FormGroup;

   register!:any;
   public users: any;

  loggedInUser:LoggedInUserModel;

    constructor(private router :Router , private signupService : SignupService, private fb:FormBuilder,private dialog: MatDialog)
    {
      // this.register = new registerModel();
      this.register =
      {
        name:"",
        email:"",
        role: "",
        password: "",
        hashKey: "",
        passwordClear: "",
        specialization_name:"",
        experience:"",
        degree:"",
        image:""
        
      }
      
      this.loggedInUser=new LoggedInUserModel();

    }

ngOnInit() {
  this.getSpecification();
  this.signup_form = this.fb.group({
    username:['', Validators.required]
  })
}
private getSpecification(): void {
  this.signupService.getAllSpecifications().subscribe(result => {
    this.users = result;
    console.log(this.users);
  });
}
  // onPost(){
  //   // this.router.navigate(['/adminpage'], { skipLocationChange: true });
  //   this.signupService.setFormDetails(this.register);
  //   this.router.navigate(['/adminpage']);
  // }

  // onPost() {
  //   this.signupService.setFormDetails(this.register);
  //   const dialogRef = this.dialog.open(PopupComponent, {
  //     width: '400px', 
  //     data: {
  //       message: "Wait until the admin approves your request / try login"
  //     }
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 'login') {
  //       this.router.navigateByUrl('login');
  //     }
  //   });
  // }

  // onPost() {
  //   if (this.register.role === 'Doctor') {
  //     this.signupService.setFormDetails(this.register);
      
  //     const dialogRef = this.dialog.open(PopupComponent, {
  //       width: '400px',
  //       data: {
  //         message: "Wait until the admin approves your request / try login"
  //       }
  //     });
    
  //     dialogRef.afterClosed().subscribe(result => {
  //       if (result === 'login') {
  //         this.router.navigateByUrl('login');
  //       }
  //     });
  //     this.router.navigate(['/adminpage'], { state: { formDetails: this.register } });
  //   } else {
  //     if (this.registerForm.valid)
  //   {
  //     this.signupService.signup(this.register).subscribe(data=>{
  //       console.log("register in component")
  //       this.loggedInUser = data as LoggedInUserModel;
  //       console.log(this.loggedInUser);
        
  //       localStorage.setItem("token",this.loggedInUser.token);
  //       localStorage.setItem("email",this.loggedInUser.email);
  //       localStorage.setItem("role",this.loggedInUser.role);
  //       this.registration_status = true;
  //       setTimeout(() => {
  //         this.router.navigate(['login']);
  //       }, 3000);
  //     },
  //     err=>{
  //       console.log(err)
  //     });
  //   }
  //   else {
  //     this.showError = true; // Show the error message
  //   } 
  //     this.router.navigateByUrl('login');
  //   }
  // }

  selectedOccupation: string;

  showSpecialization() {
    console.log('Selected occupation:', this.selectedOccupation);
  }
  

  // onPost()
  // {
  //   if (this.registerForm.valid)
  //   {
  //     this.signupService.signup(this.register).subscribe(data=>{
  //       console.log("register in component")
  //       this.loggedInUser = data as LoggedInUserModel;
  //       console.log(this.loggedInUser);
        
  //       localStorage.setItem("token",this.loggedInUser.token);
  //       localStorage.setItem("email",this.loggedInUser.email);
  //       localStorage.setItem("role",this.loggedInUser.role);
  //       this.registration_status = true;
  //       setTimeout(() => {
  //         this.router.navigate(['login']);
  //       }, 3000);
  //     },
  //     err=>{
  //       console.log(err)
  //     });
  //   }
  //   else {
  //     this.showError = true; // Show the error message
  //   } 
  //   }


  onPost() {
    if (this.registerForm.valid) {
      if (this.register.role == "Doctor") {
        this.signupService.signupStaff(this.register).subscribe(data => { console.log("Staff Register") ;
        console.log(this.register);
        const dialogRef = this.dialog.open(PopupComponent, {
                width: '400px',
                data: {
                  message: "Wait until the admin approves your request / try login"
                }
              });
            
              dialogRef.afterClosed().subscribe(result => {
                if (result === 'login') {
                  this.router.navigateByUrl('login');
                }
              });
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);},
        err => {
          console.log(err)
        });
        
      }
      else {
        this.signupService.signup(this.register).subscribe(data => {
          console.log("register in component")
          this.loggedInUser = data as LoggedInUserModel;
          console.log(this.loggedInUser);

          localStorage.setItem("token", this.loggedInUser.token);
          localStorage.setItem("email", this.loggedInUser.email);
          localStorage.setItem("role", this.loggedInUser.role);
          this.registration_status = true;
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000);
        },
          err => {
            console.log(err)
          });
      }
    }
    else {
      this.showError = true; // Show the error message
    }


  }


  login_here()
  {
    this.router.navigateByUrl('login');
  }
}


export class registerModel
{

         name:string="";
         email:string="";
         role: string="";
         password: string="";
         hashKey: string="";
         passwordClear: string="";
         specialization_name:string="";
         experience:string="";
         degree:string="";
         image:string="";

}