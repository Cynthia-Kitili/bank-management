import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';


export interface Customer {
  code: string;
  name: string;
  branch: string;
  address: string;
  customers: number;
  contact: string;
  status:number;
}

const CUSTOMER_DATA: Customer[] = [
  {code: 'BOA123', name: 'Bank of America', branch: 'Downtown', address: '123 Main St', customers: 1200, contact: '123-456-7890',status:1},
  {code: 'CHASE456', name: 'Chase Bank', branch: 'Uptown', address: '456 Oak St', customers: 900, contact: '234-567-8901',status:0},
  {code: 'WF789', name: 'Wells Fargo', branch: 'Midtown', address: '789 Pine St', customers: 1100, contact: '345-678-9012',status:1},
  {code: 'BOA123', name: 'Bank of America', branch: 'Downtown', address: '123 Main St', customers: 1200, contact: '123-456-7890',status:0},
  {code: 'CHASE456', name: 'Chase Bank', branch: 'Uptown', address: '456 Oak St', customers: 900, contact: '234-567-8901',status:0},
  {code: 'WF789', name: 'Wells Fargo', branch: 'Midtown', address: '789 Pine St', customers: 1100, contact: '345-678-9012',status:1},
  {code: 'BOA123', name: 'Bank of America', branch: 'Downtown', address: '123 Main St', customers: 1200, contact: '123-456-7890',status:0},
  {code: 'CHASE456', name: 'Chase Bank', branch: 'Uptown', address: '456 Oak St', customers: 900, contact: '234-567-8901',status:1},
  {code: 'WF789', name: 'Wells Fargo', branch: 'Midtown', address: '789 Pine St', customers: 1100, contact: '345-678-9012',status:0},
];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['actions','code', 'name', 'branch', 'address', 'customers', 'contact','status'];
  dataSource = new MatTableDataSource<Customer>();
  loading = false;

  customerForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  addCustomerForm:any;
  editCustomerForm:any;
  selectedRowData: any;
  selectedCustomerName: any;
  showDeactivateModal: any;
  showActivateModal: any;

  constructor(private formBuilder: FormBuilder) {
    this.customerForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      branch: ['', Validators.required],
      address: ['', Validators.required],
      customers: ['', [Validators.required, Validators.min(0)]],
      contact: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Simulate data fetching delay
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dataSource.data = CUSTOMER_DATA;
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

  showAddCustomerForm(){
    this.addCustomerForm = true;
  }
  hideAddCustomerForm(){
    this.addCustomerForm = false;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 200);
  }

  showEditCustomerForm(rowData: Customer){
    this.selectedRowData = rowData; // Assign the selected row's data to the property
    this.editCustomerForm = true;
    // Pre-fill the form fields with the data of the selected row
    this.customerForm.patchValue({
      code: rowData.code,
      name: rowData.name,
      branch: rowData.branch,
      address: rowData.address,
      customers: rowData.customers,
      contact: rowData.contact
    });
    
  }
  hideEditBankForm(){
    this.editCustomerForm = false;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 200);
  }

  activateModal(bankName: string) {
    this.selectedCustomerName = bankName;
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
    this.selectedCustomerName = '';
  }

  deactivateModal(bankName: string) {
    this.selectedCustomerName = bankName;
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
    this.selectedCustomerName = '';
  }

  onSubmit() {
    if (this.customerForm.valid) {
      // Proceed with form submission
      console.log(this.customerForm.value);
    } else {
      // Display error messages or handle invalid form
      console.log("Form is invalid!");
    }
  }


  exportToExcel(): void {
    const currentDate = new Date();
    const fileName = `customers_${currentDate.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/\//g, '-')}.xlsx`;
  
    // Clone the dataSource array to avoid modifying the original data
    const dataToExport = this.dataSource.data.map(row => ({ ...row }));
  
    // Remove the action field from each row
    dataToExport.forEach((row: any) => {
      delete row.actions;
    });
  
    // Convert the modified data to Excel sheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Customers');
  
    // Save the Excel file
    XLSX.writeFile(wb, fileName);
  }
  
}