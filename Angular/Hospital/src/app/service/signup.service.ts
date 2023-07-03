import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { registerModel } from "../register/model/register.model";
import { UserDTOModel } from "../register/model/userDTO.model";
import {Injectable} from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { BehaviorSubject, Observable, Subject, catchError, map, throwError } from 'rxjs';
import { Course } from "src/Course";

@Injectable({providedIn: 'root'})
export class SignupService{
  private baseServerUrl = "https://localhost:7239/api/Specializations";
  private doctorUrl="https://localhost:7239/api/Users/filteringdoctors";
  private patientUrl="https://localhost:7239/api/Users/filteringpatient";
  private registerUrl="https://localhost:7239/api/User/Register";
  private approveUrl="https://localhost:7239/api/Approve";
  private patient="https://localhost:7239/api/Patient";
  private searchUrl="https://localhost:7239/api/Users/filteringspecialization";
    constructor(private httpClient:HttpClient)
    {

    }

    signup(register:registerModel){
        console.log("register in service")
        return this.httpClient.post("https://localhost:7239/api/User/Register",register);
    }
    postData(data: any): Observable<Course> {
      return this.httpClient.post<Course>('https://localhost:7239/api/User/Register', data).pipe(
        map(response => response as Course)
      );
    }
    // postData(formData: FormData) {
    //   return this.httpClient.post("https://localhost:7239/api/User/Register", formData);
    // }
    userLogin(userDTO:UserDTOModel){
        return this.httpClient.post("https://localhost:7239/api/User/Login",userDTO);
    }
    
  private formDetailsSubject = new BehaviorSubject<any>(null);
  formDetails$ = this.formDetailsSubject.asObservable();

  setFormDetails(details: any) {
    this.formDetailsSubject.next(details);
  }
  public getAllSpecifications():Observable<any>
  {
    return this.httpClient.get(this.baseServerUrl);
  }

  public getAllDoctors():Observable<any>{
    return this.httpClient.get(this.doctorUrl);
  }

  public getAllUsers():Observable<any>{
    return this.httpClient.get(this.patientUrl);
  }
  public DeleteUser(id:number):Observable<any>{
    return this.httpClient.delete(`https://localhost:7239/api/Users/${id}`);
  }

  public DeleteDoctor(id:number):Observable<any>{
    return this.httpClient.delete(`https://localhost:7239/api/Users/${id}`);
  }

signupStaff(register:registerModel)
    {
        console.log(register);
        console.log("Registered ");
        return this.httpClient.post("https://localhost:7239/api/Approve",register);
    }
    approveStaff(register:registerModel)
    {
        console.log(register);
        console.log("Staff approved");
        return this.httpClient.post("https://localhost:7239/api/User/Register",register);
    }
    public DeleteProduct(approveId:any)
    {
      return this.httpClient.delete(`https://localhost:7239/api/Approve/` + approveId).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
          } else {
            errorMessage =  error.error;
          }
          return throwError(errorMessage);
        })
      );
    }
  public getDoctorRequest():Observable<any>
    {
        return this.httpClient.get(`https://localhost:7239/api/Approve`);
    }

    filterDoctorsBySpecialization(specialization: string) {
      const url = `https://localhost:7239/api/Users/filteringspecialization?specialization_name=${specialization}`;
      return this.httpClient.get(url);
    }

    private searchSubject = new Subject<string>();
    getDoctorsBySpecialization(specialization: string): Observable<any> {
      const params = { specialization_name: specialization };
      return this.httpClient.get<any>(this.searchUrl, { params });
    }
  
    next(value: string) {
      this.searchSubject.next(value);
    }
  
    pipe(...operators: any[]): Observable<any> {
      return operators.reduce((source, operator) => operator(source), this.searchSubject.asObservable());
    }
    
    getDoctor(doctorId: string) {
      const url = `https://localhost:7239/api/Users/${doctorId}`;
      return this.httpClient.get(url);
    }
    public submitPassengerDetails(book:any):Observable<any>
{
  return this.httpClient.post(this.patient,book);
}
public getAppoint():Observable<any>
{
    return this.httpClient.get(`https://localhost:7239/api/Patient`);
}
  }