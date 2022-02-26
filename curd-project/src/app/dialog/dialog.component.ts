import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  actionBtn: string = 'save';

  constructor(private formbuilder: FormBuilder, private api: ApiService, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData : any) { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName: ['', Validators.required],
      catagory: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date:['',Validators.required]
    })


    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['catagory'].setValue(this.editData.catagory);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }

  }

  productForm !: FormGroup;

  startDate = new Date(2022, 0, 1);
  catagories = ['fruits', 'vegetab', 'meat'];
  
  freshlists = ['Brand new', 'Second hand', 'old'];
  selectedValue = "";



  addproduct(message:any,action:any) {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next: (res) => {
              this.snackBar.open(message, action, {
                duration: 3000,
              });          },
            error: () => {
              alert("error will adding the product")
            }
        })
      }
    }
    else {
      this.updateProduct(message, action);
      
    }
  }


  updateProduct(message:any, action:any) {
    this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: () => {    
          this.snackBar.open(message, action, {
            duration: 3000,
          });
          this.productForm.reset();
          
        },
        error: (res) => {
          alert(res);
        }
    })
  }

}
