import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from '../service/signup.service';
import { HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public users: any;
  public doctors:any;
  public isUpdateFormOpen: boolean = false;
  // public student: any = {};
  selectedImage: string | ArrayBuffer | null = null;
  doctorList: Course[] = [];
  student: Course = {
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
  constructor(private route: ActivatedRoute,private http: HttpClient, private signupService : SignupService) {}


  ngOnInit() {
   
    this.getDoctors();
    this.getUsers();
  }

   
//getdoctor
private getDoctors(): void {
  this.signupService.getAllDoctors().subscribe(result => {
    this.doctors = result;
    console.log(this.doctors);
  });
}
//getuser
private getUsers(): void {
  this.signupService.getAllUsers().subscribe(result => {
    this.users = result;
    console.log(this.users);
  });
}


  // deleteuser
  public deleteUser(id: number): void {
    this.users = this.users.filter((user: any) => user.id !== id);

    this.signupService.DeleteUser(id).subscribe(
      () => console.log(`User with ID ${id} deleted successfully from the database.`),
      (error: any) => console.error('An error occurred while deleting the user:', error)
    );
  }

  // deletedoctor
  public deleteDoctor(id: number): void {
    this.doctors = this.doctors.filter((doctor: any) => doctor.id !== id);

    this.signupService.DeleteDoctor(id).subscribe(
      () => console.log(`User with ID ${id} deleted successfully from the database.`),
      (error: any) => console.error('An error occurred while deleting the user:', error)
    );
  }

//   //update user 
//   id!:number;
//   public UpdateStudentById(){
//     const registerData: registerModel = {
//       name: this.student.name,
//       email: this.student.email,
//       role: this.student.role,
//       password: '', // Provide a value for the missing properties
//       hashKey: '',
//       passwordClear: this.student.passwordClear,
//       specialization_name: this.student.specialization_name,
//       experience: this.student.experience,
//       degree: this.student.degree,
//       image: this.student.image,
//     };
//     console.log(registerData)
//     this.student.image = this.selectedImage as string || '';
     
//     // this.http.put('https://localhost:7239/api/Users/' + this.id, data, options)
//     //   .subscribe(
//     //     response => {
//     //       console.log('success');
//     //     }
//     return this.signupService.UpdateUser(this.id ,this.student)
//     .subscribe( result =>
//       {
//         alert(" Student Updated ");
//       }
      
//         ,
//         error => {
//   if (error.status === 415) {
//     console.error('Unsupported Media Type. Please check the media type of the request payload.');
//     // Perform additional error handling or display an error message to the user
//   } else {
//     console.error('An error occurred:', error);
//     // Handle other types of errors
//   }
// }
//       );
//   }

public openUpdateForm(user: any): void {
  this.isUpdateFormOpen = true;
  
  this.student = { ...user };
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
id!:number;
UpdateStudentById(): void {
  this.student.image = this.selectedImage as string || '';
  this.http.put(`https://localhost:7239/api/Users/${this.student.id}`, this.student)
    .subscribe(() => {
      console.log('Doctor updated successfully.');
      
    }, error => {
      console.log('Error occurred while updating the doctor:', error);
    });
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