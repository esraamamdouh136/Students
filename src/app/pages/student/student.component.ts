import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

export interface StudentData {
  checked : boolean;
  id: number;
  name: string;
  email: string;
  age: number;
}


const ELEMENT_DATA: StudentData[] = [
  { id: 1345890512579, name: 'Esraa Mamdouh', email: "esraa@gmail.com", age: 23 , checked: false },
  { id: 2983471694572, name: 'Mohamed Mamdouh', email: "mohamed@gmail.com", age: 30 , checked: false },
  { id: 3690156935296, name: 'Ahmed Samir', email: "ahmed@gmail.com", age: 27 , checked: false },
  { id: 4563197463805, name: 'Haidy Samir', email: "haidy@gmail.com", age: 25 , checked: false },
];

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  displayedColumns: string[] = ['checked' ,'id', 'name', 'email', 'age', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) { }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '550px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj) {
    var d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: row_obj.name,
      email: row_obj.email,
      age: row_obj.age,
      checked : row_obj.checked


    });
    this.table.renderRows();

  }
  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.name = row_obj.name;
        value.email = row_obj.email;
        value.age = row_obj.age;

      }
      return true;
    });
  }
  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }

}



