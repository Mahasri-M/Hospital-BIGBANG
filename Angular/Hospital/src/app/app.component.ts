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


  // getInterns(){
  //   this.router.navigateByUrl('getInterns')
  // }
  // getTickets(){
  //   this.router.navigateByUrl('getAllTickets')
  // }
  
  // logInTimes(){

  // }
  // viewProfiles(){
  //   this.router.navigateByUrl('profile')
  // }
  // raiseTicket(){

  // }
  // getTicketDetails(){

  // }

  logout(){
    localStorage.setItem("role","");
    this.router.navigateByUrl('login');
  }
  
}
