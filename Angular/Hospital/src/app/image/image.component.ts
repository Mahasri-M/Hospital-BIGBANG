import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SignupService } from '../service/signup.service';
import { Router } from '@angular/router';
import { LoggedInUserModel } from '../register/model/loggedinuser.model';
import { Course } from 'src/Course';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit{
  loggedInUser:LoggedInUserModel;
  studentForm!: FormGroup;
  // newData: Course = {
  //   name: '',

  //   image: '',
  //   email: '',
  //   role: '',
  //   passwordClear: '',
  //  // courseOverview:''
  // };
  selectedFile: File | null = null;
  successMessage: boolean = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private signupService: SignupService,private router:Router) {}

  ngOnInit(): void {

    let username: string | null = null;
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
     imageFile:['',Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      passwordClear: ['', Validators.required],
      //courseOverview: ['', Validators.required]
    });
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    
  }

  addStudent(): void {
    if (this.studentForm.valid && this.selectedFile) {
      const data = {
        name: this.studentForm.value.name,
        image: this.studentForm.value.imageFile,
        email: this.studentForm.value.email,
        role: this.studentForm.value.role,
        passwordClear: this.studentForm.value.passwordClear,
      };
  
      this.signupService.postData(data).subscribe(
        (course: Course) => {
          console.log('Student added successfully');
          this.studentForm.reset();
          this.selectedFile = null;
          this.successMessage = true;
        },
        (error: any) => {
          console.error('Error adding student:', error);

          if (error?.error?.errors) {
            this.errorMessage = error.error.errors;
          }
        }
      );
    } else {
      this.errorMessage = 'Please enter the specified details.';
    }
  }

  closePopup(): void {
    this.successMessage = false;
    this.errorMessage = '';
    this.router.navigateByUrl('/login')
  }
}