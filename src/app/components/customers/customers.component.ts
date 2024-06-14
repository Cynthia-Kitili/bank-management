import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { BankAdmin, Customers } from 'src/app/models/sheet.model';
import { SheetService } from 'src/app/services/sheet.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['actions', 'uniqueid', 'name', 'email', 'gender', 'accountNumber', 'loanAmount', 'accountBalance'];
  dataSource = new MatTableDataSource<BankAdmin>();
  loading = false;

  bankAdminForm!: FormGroup;
  bankEditAdminForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  addBankAdminForm: any;
  editBankAdminForm: any;
  selectedRowData: any;
  selectedName: any;
  showDeactivateModal: any;
  showActivateModal: any;
  data: any;
  loadingForm: any;
  selectedContact: any;
  bankCode: any;
  permission: any;
  bankName: any;

  constructor(private formBuilder: FormBuilder, private sheetservice: SheetService, private router: Router, private actRoute: ActivatedRoute,) {
    this.bankAdminForm = this.formBuilder.group({
      uniqueid: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountBalance: ['', Validators.required],
      loanAmount: ['', Validators.required],
      bankCode: [{ value: this.bankCode, disabled: true }, Validators.required],
      bankName: [{ value: this.bankName, disabled: true }, Validators.required],
    });
    this.bankEditAdminForm = this.formBuilder.group({
      uniqueid: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountBalance: ['', Validators.required],
      loanAmount: ['', Validators.required],
      bankCode: [{ value: this.bankCode, disabled: true }, Validators.required],
      bankName: [{ value: this.bankName, disabled: true }, Validators.required],
    });
  }

  ngOnInit() {

    this.bankCode = sessionStorage.getItem('bankCode');
    this.permission = sessionStorage.getItem('permission');
    this.bankName = sessionStorage.getItem('bankName');
    this.listData();
  }


  listData() {
    this.loading = true;
    this.sheetservice.listCustomerSheet().subscribe({
      next: (res: any) => {
        console.log(res);
        // Filter the data based on the bankCode
        this.data = res;
        const filteredData = res.filter((customer: any) => customer.bankCode === this.bankCode);
        console.log('filtered bank data', filteredData);
        setTimeout(() => {
          this.loading = false;
          this.dataSource.data = filteredData;
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

  showAddBankAdminForm() {
    this.addBankAdminForm = true;
  }
  hideAddBankAdminForm() {
    this.addBankAdminForm = false;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 200);
  }

  showEditBankAdminForm(rowData: Customers) {
    this.selectedRowData = rowData; // Assign the selected row's data to the property
    this.editBankAdminForm = true;
    // Pre-fill the form fields with the data of the selected row
    this.bankEditAdminForm.patchValue({
      uniqueid: rowData.uniqueid,
      name: rowData.name,
      email: rowData.email,
      gender: rowData.gender,
      accountNumber: rowData.accountNumber,
      loanAmount: rowData.loanAmount,
      accountBalance: rowData.accountBalance,
      bankCode: rowData.bankCode,
      bankName: rowData.bankName
    });

  }
  hideEditBankAdminForm() {
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
  deleteModal(userfullname: string, accountNumber: any) {
    this.selectedName = userfullname;
    this.selectedContact = accountNumber;
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
    this.selectedName = '';
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 200);
  }
  deleteSheet() {
    this.loadingForm = true;
    const index = this.data.findIndex((user: any) => user.contact === this.selectedContact);
    this.sheetservice.deleteCustomerSheet(index).subscribe(
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
    console.log(this.selectedContact);
  }


  onSubmit() {
    if (this.bankAdminForm.valid) {
      this.loadingForm = true;

      this.bankAdminForm.get('bankCode')?.enable();
      this.bankAdminForm.get('bankName')?.enable();

      const formValue = this.bankAdminForm.value;
      console.log('Form value before posting:', formValue);

      this.bankAdminForm.get('bankCode')?.disable();
       this.bankAdminForm.get('bankName')?.disable();

      const { uniqueid, name, email, gender, accountNumber, loanAmount, accountBalance, bankCode, bankName } = formValue;

      this.sheetservice.createCustomerSheet(uniqueid, name, email, gender, accountNumber, loanAmount, accountBalance, bankCode, bankName).subscribe({
        next: (res) => {
          console.log('Create response:', res);
          if (res) {
            this.loadingForm = false;
            this.listData();
            this.hideAddBankAdminForm();
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
    if (this.bankEditAdminForm.valid) {
      this.loadingForm = true;
      // Proceed with form submission
      console.log(this.bankEditAdminForm.value);

      this.bankAdminForm.get('bankCode')?.enable();
       this.bankAdminForm.get('bankName')?.enable();


      const formValue = this.bankEditAdminForm.value;
      console.log('Form value before posting:', formValue);

      this.bankAdminForm.get('bankCode')?.disable();
       this.bankAdminForm.get('bankName')?.disable();

      const { uniqueid, name, email, gender, accountNumber, loanAmount, accountBalance, bankCode, bankName } = formValue;
      const index = this.data.findIndex((user: any) => user.uniqueid === uniqueid);

      this.sheetservice.updateCustomerSheet(index, uniqueid, name, email, gender, accountNumber, loanAmount, accountBalance, bankCode, bankName).subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.loadingForm = false;
            this.listData();
            this.hideEditBankAdminForm();
          }
        },
        error: (error) => {
          this.loadingForm = false;
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
    XLSX.utils.book_append_sheet(wb, ws, 'customers');

    // Save the Excel file
    XLSX.writeFile(wb, fileName);
  }

}