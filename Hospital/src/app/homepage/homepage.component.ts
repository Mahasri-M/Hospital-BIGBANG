import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent 
{
  flag:boolean = false;
  flaguser:boolean=false;
  constructor()
  {
    if (localStorage.getItem("role")=="Doctor")
    {
      this.flag=true;
    }
    if(localStorage.getItem("role")=="User"){
      this.flaguser=true;
    }
  }

  
  

}
