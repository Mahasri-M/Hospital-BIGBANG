import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

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
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit{

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' 
    })
  };
  
  
  flag: boolean = false;
  doctorList: Course[] = [];
  userList:Course[]=[];
  newDoctor: Course = {
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
  isUserFormVisible: boolean = false;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient) {  }

  ngOnInit(): void {
    this.getDoctorList();
    this.getUserList();
  }


  getUserList(): void {
    this.http.get<Course[]>('https://localhost:7239/api/Users/filteringpatient')
      .subscribe(response => {
        this.userList = response;
      }, error => {
        console.log('Error occurred while retrieving doctor list:', error);
      });
  }
  addOrUpdateUser(): void {
    if (this.newDoctor.id) {
      // Update an existing doctor
      this.updateUserInDatabase();
    } else {
      // Add a new doctor
      this.addUserToDatabase();
    }
  }
  toggleFormUser(): void {
    this.isUserFormVisible = !this.isUserFormVisible;
  }
  updateUserInDatabase(): void {
    this.newDoctor.image = this.selectedImage as string || '';
    this.http.put(`https://localhost:7239/api/Users/${this.newDoctor.id}`, this.newDoctor, this.httpOptions)
      .subscribe(
        () => {
          console.log('User updated successfully.');
          this.getUserList();
          this.resetForm();
        },
        (error: HttpErrorResponse) => {
          console.log('Error occurred while updating the doctor:', error);
          if (error.status === 415) {
            console.log('Unsupported Media Type. Please check the request content type.');
          }
        }
      );
  }

  updateUser(doctor: Course): void {
    // Set the form visibility to true
    this.isUserFormVisible = true;

    // Assign the doctor details to the newDoctor object
    this.newDoctor = { ...doctor };

    // Set the selected image to the doctor's image path
    this.selectedImage = this.newDoctor.image;
  }

  addUserToDatabase(): void {
    this.newDoctor.image = this.selectedImage as string || '';
    this.http.post('https://localhost:7239/api/User/Register', this.newDoctor, this.httpOptions)
      .subscribe(() => {
        console.log('User added successfully.');
        this.getUserList();
        this.resetForm();
      }, error => {
        console.log('Error occurred while adding a user:', error);
      });
  }
  deleteUser(doctor: Course): void {
    const index = this.userList.indexOf(doctor);
    if (index > -1) {
      // Remove the doctor from the local array
      this.userList.splice(index, 1);

      // Delete the doctor from the database
      this.http.delete(`https://localhost:7239/api/Users/${doctor.id}`)
        .subscribe(() => {
          console.log('User deleted successfully.');
        }, error => {
          console.log('Error occurred while deleting the User:', error);
        });
    }
}


  //image
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

  //doctor
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  addOrUpdateDoctor(): void {
    if (this.newDoctor.id) {
      // Update an existing doctor
      this.updateDoctorInDatabase();
    } else {
      // Add a new doctor
      this.addDoctorToDatabase();
    }
  }

  updateDoctorInDatabase(): void {
    this.newDoctor.image = this.selectedImage as string || '';
    this.http.put(`https://localhost:7239/api/Users/${this.newDoctor.id}`, this.newDoctor, this.httpOptions)
      .subscribe(
        () => {
          console.log('Doctor updated successfully.');
          this.getDoctorList();
          this.resetForm();
        },
        (error: HttpErrorResponse) => {
          console.log('Error occurred while updating the doctor:', error);
          if (error.status === 415) {
            console.log('Unsupported Media Type. Please check the request content type.');
          }
        }
      );
  }

  addDoctorToDatabase(): void {
    this.newDoctor.image = this.selectedImage as string || '';
    this.http.post('https://localhost:7239/api/User/Register', this.newDoctor, this.httpOptions)
      .subscribe(() => {
        console.log('Doctor added successfully.');
        this.getDoctorList();
        this.resetForm();
      }, error => {
        console.log('Error occurred while adding a doctor:', error);
      });
  }
  getDoctorList(): void {
    this.http.get<Course[]>('https://localhost:7239/api/Users/filteringdoctors')
      .subscribe(response => {
        this.doctorList = response;
      }, error => {
        console.log('Error occurred while retrieving doctor list:', error);
      });
  }
  updateDoctor(doctor: Course): void {
    // Set the form visibility to true
    this.isFormVisible = true;

    // Assign the doctor details to the newDoctor object
    this.newDoctor = { ...doctor };

    // Set the selected image to the doctor's image path
    this.selectedImage = this.newDoctor.image;
  }
  deleteDoctor(doctor: Course): void {
    const index = this.doctorList.indexOf(doctor);
    if (index > -1) {
      // Remove the doctor from the local array
      this.doctorList.splice(index, 1);

      // Delete the doctor from the database
      this.http.delete(`https://localhost:7239/api/Users/${doctor.id}`)
        .subscribe(() => {
          console.log('Doctor deleted successfully.');
        }, error => {
          console.log('Error occurred while deleting the doctor:', error);
        });
    }
}

resetForm(): void {
  this.newDoctor = {
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