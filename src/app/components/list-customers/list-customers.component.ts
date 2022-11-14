import { IfStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CustomerI} from '../../../model/customer.interface';
import {CustomerService} from '../../services/customer.service';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import{FormComponent} from '../form/form.component';

@Component({
  selector: 'listCustomers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent implements OnInit {

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  

  displayedColumns: string[] = ['name', 'city', 'order','actions','new'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(
    private CustomerService:CustomerService,
    private dialog:MatDialog) {}

  ngOnInit(): void {
    this.CustomerService.getAllCustomers().subscribe(res => this.dataSource.data=res);
  } 

  onEdit(element){
    this.resetForm();
    this.openModal();
    if(element){
      this.CustomerService.selected=element;
    }
   

  }

  onDelete(id:string){
    this.CustomerService.deleteCustomer(id);

  }

  openModal():void{
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data={
      title:'Modal'
    };
    dialogConfig.autoFocus=true;
    this.dialog.open(FormComponent,dialogConfig);
  }

  resetForm():void{
    this.CustomerService.selected.name='';
    this.CustomerService.selected.city='';
    this.CustomerService.selected.order='';
    this.CustomerService.selected.id=null;
  }




  


}
