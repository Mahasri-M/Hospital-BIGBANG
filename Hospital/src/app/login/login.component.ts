import { Component } from '@angular/core';
import { SignupService } from '../service/signup.service';
import { UserDTOModel } from '../register/model/userDTO.model';

import { LoggedInUserModel } from '../register/model/loggedinuser.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  userDTO:UserDTOModel
  loggedInUser:LoggedInUserModel
  

  constructor(private signupService : SignupService, private router : Router){
    this.userDTO=new UserDTOModel();
    this.loggedInUser=new LoggedInUserModel

  }

 

  // Login(){

  //   this.signupService.userLogin(this.userDTO).subscribe(data=>{
      
  //     this.loggedInUser = data as LoggedInUserModel;
  //     console.log(this.loggedInUser);
      
  //     localStorage.setItem("token",this.loggedInUser.token);
  //     localStorage.setItem("email",this.loggedInUser.email);
  //     localStorage.setItem("role",this.loggedInUser.role);
  //     localStorage.setItem("login", new Date().toDateString());
  //     alert("Login Successful")
  //     this.router.navigateByUrl('homepage');
  //   },
  //   err=>{
  //     console.log(err)
  //     alert("Invalid Username/password")
  //   });
  // }

  Login() {
    this.signupService.userLogin(this.userDTO).subscribe(
      (data) => {
        this.loggedInUser = data as LoggedInUserModel;
        console.log(this.loggedInUser);
  
        localStorage.setItem("token", this.loggedInUser.token);
        localStorage.setItem("email", this.loggedInUser.email);
        localStorage.setItem("role", this.loggedInUser.role);
        localStorage.setItem("login", new Date().toDateString());
       // alert("Login Successful");
  
        if (this.loggedInUser.role === "Admin") {
          this.router.navigateByUrl('admin');
        } else {
          this.router.navigateByUrl('homepage');
        }
      },
      (err) => {
        console.log(err);
        alert("Invalid Username/password");
      }
    );
  }
  
  move(){
    this.router.navigateByUrl('register');
  }
}
