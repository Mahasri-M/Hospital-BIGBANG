import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Hospital';
  roleStatus:boolean=false
  role:string=""
  
 constructor(private router : Router){

   this.role = localStorage.getItem("role")
   this.router.navigateByUrl('login');

  }


  logout(){
    localStorage.setItem("role","");
    this.router.navigateByUrl('login');
  }
  
}
