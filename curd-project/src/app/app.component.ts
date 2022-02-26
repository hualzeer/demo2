import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'curd-project';

  displayedColumns: string[] = ['productName', 'catagory', 'date','freshness','price','comment','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog:MatDialog, private api:ApiService , private snacks:MatSnackBar) {
    
  }
  
  ngOnInit(): void {
    this.getAllproduct();   
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '40%',
      height:'89%'
    }).afterClosed().subscribe(() => {
        this.getAllproduct()

    })
    
  }


  getAllproduct() {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error while fetching the information")
        }
        
    })
  }

  editProduct(row :any) {
   const dialogRef= this.dialog.open(DialogComponent, {
      width: '40%',
      height: '89%',
      data:row
    }).afterClosed().subscribe(() => {
      
        this.getAllproduct();
      
    })
  }

  deleteProduct(id :number,message:any, action:any) {
    this.api.deleteProduct(id)
      .subscribe({
        next: (res) => {
          this.snacks.open(message, action, {
            duration: 3000,
          });
          this.getAllproduct();
        },
        error: (res) => {
          alert('error');
        }
      })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

