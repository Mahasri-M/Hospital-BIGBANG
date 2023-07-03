import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from '../service/signup.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, TableCell } from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent  implements OnInit{
  public users:any;
  public pdfview! :FormGroup;
  constructor(private formBuilder:FormBuilder, private authService:SignupService,private http:HttpClient, private router:Router){  }
  
  
ngOnInit(): void {
  this.bus();

}
private bus():void{
  this.pdfview=this.formBuilder.group({
    // userId:[],
    patientName:[],
    patientEmail:[],
    gender:[] ,
    age:[],
    slot:[],
    problem:[]
  });
}
public AddNewUser(): void
{
  this.authService.submitPassengerDetails (this.pdfview.value)
  .subscribe(result =>{
   console.log( "Your account created successfully. Now you can go and book your tickets.");
  },
  error => {
    console.log("An error occurred while submitting the form: ", error);
    // Handle the error here
  });
}
}
