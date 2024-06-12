import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Bank } from 'src/app/models/sheet.model';
import { SheetService } from 'src/app/services/sheet.service';
import * as XLSX from 'xlsx';


// export interface Bank {
//   code: string;
//   name: string;
//   branch: string;
//   address: string;
//   customers: number;
//   contact: string;
//   status: number;
// }

const BANK_DATA: Bank[] = [
  { code: 'BOA123', name: 'Bank of America', branch: 'Downtown', address: '123 Main St', customers: 1200, contact: '123-456-7890', status: 1 },
  { code: 'CHASE456', name: 'Chase Bank', branch: 'Uptown', address: '456 Oak St', customers: 900, contact: '234-567-8901', status: 0 },
  { code: 'WF789', name: 'Wells Fargo', branch: 'Midtown', address: '789 Pine St', customers: 1100, contact: '345-678-9012', status: 1 },
  { code: 'BOA123', name: 'Bank of America', branch: 'Downtown', address: '123 Main St', customers: 1200, contact: '123-456-7890', status: 0 },
  { code: 'CHASE456', name: 'Chase Bank', branch: 'Uptown', address: '456 Oak St', customers: 900, contact: '234-567-8901', status: 0 },
  { code: 'WF789', name: 'Wells Fargo', branch: 'Midtown', address: '789 Pine St', customers: 1100, contact: '345-678-9012', status: 1 },
  { code: 'BOA123', name: 'Bank of America', branch: 'Downtown', address: '123 Main St', customers: 1200, contact: '123-456-7890', status: 0 },
  { code: 'CHASE456', name: 'Chase Bank', branch: 'Uptown', address: '456 Oak St', customers: 900, contact: '234-567-8901', status: 1 },
  { code: 'WF789', name: 'Wells Fargo', branch: 'Midtown', address: '789 Pine St', customers: 1100, contact: '345-678-9012', status: 0 },
];

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {
  displayedColumns: string[] = ['actions', 'code', 'name', 'branch', 'address', 'customers', 'contact', 'status'];
  dataSource = new MatTableDataSource<Bank>();
  loading = false;

  bankForm!: FormGroup;
  bankEditForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  addBankForm: any;
  editBankForm: any;
  selectedRowData: any;
  selectedBankName: any;
  showDeactivateModal: any;
  showActivateModal: any;
  data: any;
  sheetdata: any;
  id:any;
  selectedBankCode: any;
  loadingForm: any;

  constructor(private formBuilder: FormBuilder, private sheetservice: SheetService, private router: Router,private actRoute: ActivatedRoute,) {
    this.bankForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      branch: ['', Validators.required],
      address: ['', Validators.required],
      customers: ['', [Validators.required, Validators.min(0)]],
      contact: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.bankEditForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      branch: ['', Validators.required],
      address: ['', Validators.required],
      customers: ['', [Validators.required, Validators.min(0)]],
      contact: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.listData();
  }

  listData() {
    this.loading = true;
    this.sheetservice.listBankSheet().subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
        console.log('bank data',this.data)
        setTimeout(() => {
          this.loading = false;
          this.dataSource.data = this.data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 500);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showAddBankForm() {
    this.addBankForm = true;
  }
  hideAddBankForm() {
    this.addBankForm = false;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 200);
  }

  showEditBankForm(rowData: Bank) {
    console.log('rowData', rowData)
    this.selectedRowData = rowData; // Assign the selected row's data to the property
    this.editBankForm = true;
    // Pre-fill the form fields with the data of the selected row
    this.bankEditForm.patchValue({
      code: rowData.code,
      name: rowData.name,
      branch: rowData.branch,
      address: rowData.address,
      customers: rowData.customers,
      contact: rowData.contact,
      status: rowData.status
    });

  }
  hideEditBankForm() {
    this.editBankForm = false;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 200);
  }

  activateModal(bankName: string) {
    this.selectedBankName = bankName;
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
    this.selectedBankName = '';
  }

  deactivateModal(bankName: string) {
    // console.log('id1',index)
    this.selectedBankName = bankName;
    // this.selectedBankCode = index;
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
    this.selectedBankName = '';
  }
  deleteModal(bankName: string,code:any) {
    this.selectedBankName = bankName;
    this.selectedBankCode = code;
    const modal = document.getElementById('deleteModal');
    modal?.classList.add('show');
    modal?.setAttribute('aria-modal', 'true');
    modal?.setAttribute('style', 'display: block;');
  }

  closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal?.classList.remove('show');
    modal?.setAttribute('aria-modal', 'false');
    modal?.setAttribute('style', 'display: none;');
    this.selectedBankName = '';
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 200);
  }
  deleteSheet() {
    this.loadingForm = true;
    const index = this.data.findIndex((bank: any) => bank.code === this.selectedBankCode);
    this.sheetservice.deleteBankSheet(index).subscribe(
      (res: any) => {
        this.loadingForm = false;
        console.log(res);
        this.listData();
        this.closeDeleteModal();
      },
      (error) => {
        this.loadingForm = false;
        console.log(error);
      }
    );
    console.log(this.selectedBankCode);
  }


  onSubmit() {
    if (this.bankForm.valid) {
      this.loadingForm = true;
      const formValue = this.bankForm.value;
      console.log('Form value before posting:', formValue);
  
      const { code, name, branch, address, customers, contact, status } = formValue;
  
      this.sheetservice.createBankSheet(code, name, branch, address, customers, contact, status).subscribe({
        next: (res) => {
          console.log('Create response:', res);
          if (res) {
            this.loadingForm = false;
            this.listData();
            this.hideAddBankForm();
          }
        },
        error: (error) => {
          this.loadingForm = false;
          console.error('Error creating sheet:', error);
        }
      });
    } else {
      this.loadingForm = false;
      console.log("Form is invalid!");
    }
  }

  onEdit() {
    if (this.bankEditForm.valid) {
      this.loadingForm= true;
      // Proceed with form submission
      console.log(this.bankEditForm.value);

      const code = this.bankEditForm.value.code;
      const name = this.bankEditForm.value.name;
      const branch = this.bankEditForm.value.branch;
      const address = this.bankEditForm.value.address;
      const customers = this.bankEditForm.value.customers;
      const contact = this.bankEditForm.value.contact;
      const status = this.bankEditForm.value.status;
      const index = this.data.findIndex((bank: any) => bank.code === code);

      this.sheetservice.updateBankSheet(index,code, name, branch, address, customers, contact, status,).subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.loadingForm= false;
            this.listData();
            this.hideEditBankForm();
          }
        },
        error: (error) => {
          this.loadingForm= false;
          console.log(error);
        },
      });
    } else {
      // Display error messages or handle invalid form
      console.log("Form is invalid!");
    }
  }



  exportToExcel(): void {
    const currentDate = new Date();
    const fileName = `banks_${currentDate.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/\//g, '-')}.xlsx`;

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