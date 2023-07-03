import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggedInUserModel } from './model/loggedinuser.model';
import { Router } from '@angular/router';
import { SignupService } from '../service/signup.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

export interface Course {
  id: number;
  name: string;
  role: string;
  image: string;
  passwordClear: string,
  specialization_name:string,
  degree:string,
  experience:string,
  email:string
}
@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {
  @ViewChild('register_form') registerForm: NgForm;
  showError: boolean = false;
  registration_status = false;
  flag: boolean = false;
  
  doctorList: Course[] = [];
  register: Course = {
    id: 0,
    name: '',
    role: '',
    image: '',
    passwordClear: '',
    email:'',
    specialization_name:'',
    degree:'',
    experience:''
  };
  
  isFormVisible: boolean = false;
  selectedImage: string | ArrayBuffer | null = null;
  public signup_form!:FormGroup;
 

  //  register!:any;
   public users: any;

  loggedInUser:LoggedInUserModel;

  constructor(private http: HttpClient,private router :Router , 
    private signupService : SignupService, private fb:FormBuilder,private dialog: MatDialog) 
  {
      this.loggedInUser=new LoggedInUserModel();
    if (localStorage.getItem("role") == "Admin") {
      this.flag = true;
    }
  }

  ngOnInit(): void {
    this.getDoctorList();
    this.getSpecification();
  }
  private getSpecification(): void {
    this.signupService.getAllSpecifications().subscribe(result => {
      this.users = result;
      console.log(this.users);
    });
  }
  selectedOccupation: string;

  showSpecialization() {
    console.log('Selected occupation:', this.selectedOccupation);
  }

 
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File): void {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
  }


  addDoctorToDatabase(): void {
    const registerData: registerModel = {
      name: this.register.name,
      email: this.register.email,
      role: this.register.role,
      password: '', // Provide a value for the missing properties
      hashKey: '',
      passwordClear: this.register.passwordClear,
      specialization_name: this.register.specialization_name,
      experience: this.register.experience,
      degree: this.register.degree,
      image: this.register.image,
    };
  console.log(registerData)
    this.register.image = this.selectedImage as string || '';
    if(this.registerForm.valid){
      
     
        // this.signupService.signup(registerData).subscribe(data => {
        //   console.log("register in component")
        //   this.loggedInUser = data as LoggedInUserModel;
        //   console.log(this.loggedInUser);

        //   localStorage.setItem("token", this.loggedInUser.token);
        //   localStorage.setItem("email", this.loggedInUser.email);
        //   localStorage.setItem("role", this.loggedInUser.role);
        //   this.registration_status = true;
        //   setTimeout(() => {
        //     this.router.navigate(['login']);
        //   }, 3000);
        // },
        //   err => {
        //     console.log(err)
        //   });
if(this.register.role == "Doctor"){
  this.register.image = this.selectedImage as string || '';
  this.http.post('https://localhost:7239/api/Approve', this.register)
    .subscribe(() => {
      console.log('Request submitted.');
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
       this.getDoctorList();
      // this.resetForm();
    }, error => {
      console.log('Error occurred while adding a doctor:', error);
    });
}else{
        this.register.image = this.selectedImage as string || '';
        this.http.post('https://localhost:7239/api/User/Register', this.register)
          .subscribe(() => {
            console.log('Doctor added successfully.');
            
             this.getDoctorList();
            // this.resetForm();
          }, error => {
            console.log('Error occurred while adding a doctor:', error);
          });
        }
      }
    
    else {
      this.showError = true; // Show the error message
    }
  }

  getDoctorList(): void {
    this.http.get<Course[]>('https://localhost:7239/api/Users/filteringdoctors')
      .subscribe(response => {
        this.doctorList = response;
      }, error => {
        console.log('Error occurred while retrieving doctor list:', error);
      });
  }

  
  login_here()
  {
    this.router.navigateByUrl('login');
  }

  resetForm(): void {
    this.register = {
      id: 0,
      name: '',
      role: '',
      image: '',
      passwordClear: '',
      email:'',
      specialization_name:'',
      degree:'',
      experience:''
    };
    this.selectedImage = null;
    this.isFormVisible = false;
  }
}
export class registerModel {
  name: string = "";
  email: string = "";
  role: string = "";
  password: string = "";
  hashKey: string = "";
  passwordClear: string = "";
  specialization_name: string = "";
  experience: string = "";
  degree: string = "";
  image: string = "";
}
