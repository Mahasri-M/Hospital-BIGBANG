import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { SignupService } from '../service/signup.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-exceluser',
  template: `
  <button (click)="exportToExcel()" class="btn btn-primary">Export to Excel</button>
`,
})
export class ExceluserComponent {
  users: any[] = [];

  constructor(private signupService: SignupService) {}
  exportToExcel(): void {
    this.signupService.getAllUsers().subscribe(result => {
      this.users = result;
      console.log(this.users);

      const selectedColumns = ['name', 'email', 'role']; 

      const filteredUsers = this.users.map(user => {
        const filteredUser: any = {};
        selectedColumns.forEach(column => {
          filteredUser[column] = user[column];
        });
        return filteredUser;
      });

      const maxCharactersPerCell = 32767;
      filteredUsers.forEach(user => {
        Object.keys(user).forEach(key => {
          const cellValue: string = user[key];
          if (cellValue && cellValue.length > maxCharactersPerCell) {
            const chunks = cellValue.match(new RegExp(`.{1,${maxCharactersPerCell}}`, 'g'));
            user[key] = chunks;
          }
        });
      });
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredUsers);
      const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'User_details');
    });
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, fileName + '.xlsx');
  }
}
