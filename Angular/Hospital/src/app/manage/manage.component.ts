import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from '../service/signup.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public users: any;
  public doctors:any;
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
}
