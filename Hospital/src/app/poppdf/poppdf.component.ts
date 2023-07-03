import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { TDocumentDefinitions } from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-poppdf',
  templateUrl: './poppdf.component.html',
  styleUrls: ['./poppdf.component.css']
})
export class PoppdfComponent {
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { documentDefinition: TDocumentDefinitions, openMode: 'open' | 'download' },
  public dialogRef: MatDialogRef<PoppdfComponent>
) {}
}
