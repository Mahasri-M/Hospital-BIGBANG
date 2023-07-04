import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popadmin',
  templateUrl: './popadmin.component.html',
  styleUrls: ['./popadmin.component.css']
})
export class PopadminComponent {
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {
    this.message = data.message;
  }
}
