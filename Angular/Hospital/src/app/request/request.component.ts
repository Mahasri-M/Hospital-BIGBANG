import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from '../service/signup.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  flag:boolean = false;
  flaguser:boolean=false;
  public users: any;
  public doctors:any;
  userId: number;
  constructor(private route: ActivatedRoute,private http: HttpClient, private signupService : SignupService){
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
      (data: any) => {
        const userId = data.id;
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  ngOnInit() {
   
    this.getAppoint();
  
  }

 //getuser
private getAppoint(): void {
  this.signupService.getAppoint().subscribe(result => {
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
}
