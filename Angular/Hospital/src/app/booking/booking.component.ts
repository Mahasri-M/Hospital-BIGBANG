import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from '../service/signup.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, TableCell } from 'pdfmake/build/pdfmake';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { PoppdfComponent } from '../poppdf/poppdf.component';


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  flag: boolean = false;
  flaguser:boolean=false
  bookingResult: string = '';
  doctor: any;
  doctors: any[] = [];
  showError: boolean = false;

  public pdfview!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private signupService: SignupService,
    private formBuilder: FormBuilder,
    private dialog:MatDialog
  ) {
    if (localStorage.getItem('role') == 'Doctor') {
      this.flag = true;
    }
    if(localStorage.getItem("role")=="User"){
      this.flaguser=true;
    }
  }

  doctorId!:any;
  ngOnInit(): void {
    this.pdf();
    this.doctorId = this.route.snapshot.paramMap.get('doctorId');
    this.pdfview.get('id')?.setValue(this.doctorId);

    this.signupService.getDoctor(this.doctorId).subscribe(
      (data: any) => {
        this.doctor = data;
      },
      (error: any) => {
        console.error('Error fetching doctor details:', error);
      }
    );
  }
  
  private pdf(): void {
    this.pdfview = this.formBuilder.group({
      id:[],
      patientName: [],
      patientEmail: [],
      age: [],
      gender: [],
      slot: [],
      problem: []
    });
  }
  public openPdf(): void {
    this.generatePdf('open');
  }
  
  public downloadPdf(): void {
    this.generatePdf('download');
  }
  
  public submitPassengerDetails(): void {
    if (this.pdfview.valid) {
      this.signupService.submitPassengerDetails(this.pdfview.value).subscribe(
        (result) => {
          this.bookingResult = 'Booked successfully. Now you can view or download your appointment details';
          console.log(this.pdfview);
          const dialogRef = this.dialog.open(PoppdfComponent, {
            width: '400px',
            data: {
              message: "Appointment successfull.<br> Now you can download the PDF",
              openMode: null
            }
          });
        
          dialogRef.afterClosed().subscribe(result => {
            if (result === 'openPdf') {
              this.generatePdf('open'); 
            } else if (result === 'downloadPdf') {
              this.generatePdf('download'); 
            }
          });
          
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.showError = true; // Show the error message
    }
  }

  public generatePdf(openMode: 'open' | 'download'): void {
    try {
      
      const documentDefinition: TDocumentDefinitions = {
        content: [
          { text: 'Appointment Information', style: 'mainheader' },
          { text: 'Your appointment confirmed.', style: 'content' },
          {
            table: {
              widths: [100, '*'],
              body: [
                [
                  {
                    text: 'Docter Details',
                    style: 'subheader',
                    colSpan: 2,
                    fillColor: '#ffc2d1',
                    alignment: 'center',
                    border: [true, true, true, true],
                    margin: [10, 10],
                    // bold: true,
                    fontSize: 14,
                    padding: [5, 5]
                  },
                  {}
                ],
                [
                  { text: 'Name', style: 'bodycontent' },
                  { text: this.doctor.name, style: 'bodystyle' }
                ],
                [
                  { text: 'Email', style: 'bodycontent' },
                  { text: this.doctor.email, style: 'bodystyle' }
                ],
                [
                  { text: 'Specialization', style: 'bodycontent' },
                  { text: this.doctor.specialization_name, style: 'bodystyle' }
                ],
               
              ]
            }
          },
          { text: 'Patient details', style: 'header' },
          {
            table: {
              widths: [100, '*'],
              body: [
                [
                  { text: 'Name', style: 'busNameValueStyle' },
                  { text: this.pdfview.value.patientName, style: 'busNameLabelStyle' }
                ],
                [
                  { text: 'Email', style: 'busNameLabelStyle' },
                  { text: this.pdfview.value.patientEmail, style: 'busNameValueStyle' }
                ],
                [
                  { text: 'Age', style: 'busNameValueStyle' },
                  { text: this.pdfview.value.age, style: 'busNameLabelStyle' }
                ],
                [
                  { text: 'Gender', style: 'busNameLabelStyle' },
                  { text: this.pdfview.value.gender, style: 'busNameValueStyle' }
                ],
                [
                  { text: 'Slot', style: 'busNameValueStyle' },
                  { text: this.pdfview.value.slot, style: 'busNameLabelStyle' }
                ],
                [
                  { text: 'Problem', style: 'busNameLabelStyle' },
                  { text: this.pdfview.value.problem, style: 'busNameValueStyle' }
                ]
              ] as unknown as TableCell[][]
            }
          }
        ],
        styles: {
          mainheader: {
            fontSize: 18,
            // bold: true,
            margin: [200, 0, 0, 10] as [number, number, number, number]
          },
          header: {
            fontSize: 18,
            // bold: true,
            margin: [200, 50, 0, 10] as [number, number, number, number]
          },
          busNameValueStyle: {
            fillColor: '#ffe5ec',
            color: '#000000',
            margin: [0, 10, 6, 8] as [number, number, number, number]
          },
          busNameLabelStyle: {
            fillColor: '#ffc2d1',
            color: '#000000',
            margin: [0, 10, 6, 8] as [number, number, number, number]
          },
          subheader: {
            fontSize: 14,
            //bold: true,
            margin: [0, 20, 6, 20] as [number, number, number, number]
          },
          body: {
            fontSize: 12,
            //bold: false,
            margin: [0, 15, 0, 9] as [number, number, number, number]
          },
          bodycontent: {
            fontSize: 12,
            bold: false,
            margin: [0, 15, 0, 9] as [number, number, number, number]
          },
          bodystyle: {
            fontSize: 12,
            //bold: true,
            margin: [0, 15, 0, 9] as [number, number, number, number]
          },
          content: {
            fontSize: 15,
            bold: false,
            margin: [30, 0, 0, 10] as [number, number, number, number]
          }
        }
      };

      const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

      if (openMode === 'open') {
        pdfDocGenerator.open();
      } else if (openMode === 'download') {
        pdfDocGenerator.download('booking_details.pdf');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
}
