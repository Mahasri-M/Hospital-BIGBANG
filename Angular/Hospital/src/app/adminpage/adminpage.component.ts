import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from '../service/signup.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  formDetails: any;
  showFormDetails = true;
  public users: any;
  public doctors:any;
  public image:any;
  public staffs:any;



  constructor(private route: ActivatedRoute,private http: HttpClient, private signupService : SignupService) {}

  ngOnInit() {
   
    this.getDoctors();
    this.getUsers();
    this.getStaffs();
  

    this.signupService.formDetails$.subscribe(details => {
      this.formDetails = details;
      this.showFormDetails = !!this.formDetails;
    });
  }
  
  approveForm() {
   
    this.http.post<any>('https://localhost:7239/api/User/Register', this.formDetails)
      .subscribe(response => {
        console.log(response);

        this.signupService.setFormDetails(null);
        this.showFormDetails = false;
      }, error => {
        console.error(error);
      });
  }
   declineForm() {
    this.signupService.setFormDetails(null);
    this.showFormDetails = false;
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
  //getstaffs
  private getStaffs(): void {
    this.signupService.getDoctorRequest().subscribe(result => {
      this.staffs = result;
      console.log(this.staffs);
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


