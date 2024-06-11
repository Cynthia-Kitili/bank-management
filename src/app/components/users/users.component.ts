import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';

export interface BankAdmin {
  fullname: string;
  bankCode: string;
  bankName: string;
  gender: string;
  contact: string;
  status:number;
}

const BANKADMIN_DATA: BankAdmin[] = [
  {fullname: 'Rajesh K', bankCode: 'BOA123', bankName: 'Bank of America', gender: 'F',contact: '123-456-7890',status:1},
  {fullname: 'Penny W', bankCode: 'CHASE456', bankName: 'Chase Bank', gender: 'M', contact: '234-567-8901',status:0},
  {fullname: 'Sheldon J', bankCode: 'WF789', bankName: 'Wells Fargo', gender: 'M',  contact: '345-678-9012',status:1},
  {fullname: 'Leonard B', bankCode: 'BOA123', bankName: 'Bank of America', gender: 'F', contact: '123-456-7890',status:0},
  {fullname: 'Bernaddete R', bankCode: 'CHASE456', bankName: 'Chase Bank', gender: 'M', contact: '234-567-8901',status:0},
  {fullname: 'Ammy K', bankCode: 'WF789', bankName: 'Wells Fargo', gender: 'M', contact: '345-678-9012',status:1},
  {fullname: 'Howard L', bankCode: 'BOA123', bankName: 'Bank of America', gender: 'F', contact: '123-456-7890',status:0},
  {fullname: 'Bert B', bankCode: 'CHASE456', bankName: 'Chase Bank', gender: 'M', contact: '234-567-8901',status:1},
  {fullname: 'Rajesh K', bankCode: 'BOA123', bankName: 'Bank of America', gender: 'F',contact: '123-456-7890',status:1},
  {fullname: 'Penny W', bankCode: 'CHASE456', bankName: 'Chase Bank', gender: 'M', contact: '234-567-8901',status:0},
  {fullname: 'Sheldon J', bankCode: 'WF789', bankName: 'Wells Fargo', gender: 'M',  contact: '345-678-9012',status:1},
  {fullname: 'Leonard B', bankCode: 'BOA123', bankName: 'Bank of America', gender: 'F', contact: '123-456-7890',status:0},
  {fullname: 'Bernaddete R', bankCode: 'CHASE456', bankName: 'Chase Bank', gender: 'M', contact: '234-567-8901',status:0},
  {fullname: 'Ammy K', bankCode: 'WF789', bankName: 'Wells Fargo', gender: 'M', contact: '345-678-9012',status:1},
  {fullname: 'Howard L', bankCode: 'BOA123', bankName: 'Bank of America', gender: 'F', contact: '123-456-7890',status:0},
  {fullname: 'Bert B', bankCode: 'CHASE456', bankName: 'Chase Bank', gender: 'M', contact: '234-567-8901',status:1},
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['actions','fullname', 'bankCode', 'bankName', 'gender', 'contact','status'];
  dataSource = new MatTableDataSource<BankAdmin>();
  loading = false;

  bankAdminForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  addBankAdminForm:any;
  editBankAdminForm:any;
  selectedRowData: any;
  selectedName: any;
  showDeactivateModal: any;
  showActivateModal: any;

  constructor(private formBuilder: FormBuilder) {
    this.bankAdminForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      bankCode: ['', Validators.required],
      bankName: ['', Validators.required],
      gender: ['', Validators.required],
      contact: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dataSource.data = BANKADMIN_DATA;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showAddBankAdminForm(){
    this.addBankAdminForm = true;
  }
  hideAddBankAdminForm(){
    this.addBankAdminForm = false;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 200);
  }

  showEditBankAdminForm(rowData: BankAdmin){
    this.selectedRowData = rowData; // Assign the selected row's data to the property
    this.editBankAdminForm = true;
    // Pre-fill the form fields with the data of the selected row
    this.bankAdminForm.patchValue({
      fullname: rowData.fullname,
      bankCode: rowData.bankCode,
      bankName: rowData.bankName,
      gender: rowData.gender,
      contact: rowData.contact,
      status: rowData.status
    });
    
  }
  hideEditBankAdminForm(){
    this.editBankAdminForm = false;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 200);
  }

  activateModal(fullname: string) {
    this.selectedName = fullname;
    const modal = document.getElementById('activateModal');
    modal?.classList.add('show');
    modal?.setAttribute('aria-modal', 'true');
    modal?.setAttribute('style', 'display: block;');
  }
  
  closeActivateModal() {
    const modal = document.getElementById('activateModal');
    modal?.classList.remove('show');
    modal?.setAttribute('aria-modal', 'false');
    modal?.setAttribute('style', 'display: none;');
    this.selectedName = '';
  }

  deactivateModal(fullname: string) {
    this.selectedName = fullname;
    const modal = document.getElementById('deactivateModal');
    modal?.classList.add('show');
    modal?.setAttribute('aria-modal', 'true');
    modal?.setAttribute('style', 'display: block;');
  }

  closeDeactivateModal() {
    const modal = document.getElementById('deactivateModal');
    modal?.classList.remove('show');
    modal?.setAttribute('aria-modal', 'false');
    modal?.setAttribute('style', 'display: none;');
    this.selectedName = '';
  }

  onSubmit() {
    if (this.bankAdminForm.valid) {
      // Proceed with form submission
      console.log(this.bankAdminForm.value);
    } else {
      // Display error messages or handle invalid form
      console.log("Form is invalid!");
    }
  }


  exportToExcel(): void {
    const currentDate = new Date();
    const fileName = `bankadmins_${currentDate.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/\//g, '-')}.xlsx`;
  
    // Clone the dataSource array to avoid modifying the original data
    const dataToExport = this.dataSource.data.map(row => ({ ...row }));
  
    // Remove the action field from each row
    dataToExport.forEach((row: any) => {
      delete row.actions;
    });
  
    // Convert the modified data to Excel sheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Banks');
  
    // Save the Excel file
    XLSX.writeFile(wb, fileName);
  }
  
}