import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../service/signup.service';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent 
{
  flag:boolean = false;
  flaguser:boolean=false;
  id: number;
  constructor(private signupService:SignupService)
  {
    if (localStorage.getItem("role")=="Doctor")
    {
      this.flag=true;
    }
    if(localStorage.getItem("role")=="User"){
      this.flaguser=true;
    }
  }

 

  login(email: string, password: string) {
    this.signupService.getUserByEmail(email).subscribe(
      (user: Course) => {
        this.id = user.id;
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  
  

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