import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit,Inject } from '@angular/core';
import{CustomerService} from '../../services/customer.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'formModal',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor( public customer:CustomerService,
    private dialogRef:MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) data ) {}

  ngOnInit(): void {
  }

  onSaveForm(){

    if(this.customer.selected.id == null){
      //new

      let newCustomer={
        name:this.customer.selected.name,
        city:this.customer.selected.city,
        order:this.customer.selected.order

      }
      
      this.customer.addCustomer(newCustomer);

    }else{
      this.customer.editCustomer(this.customer.selected);
    }
    this.close();
 
  }
  close():void{
    this.dialogRef.close();
  }

}
