import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/material.module';
import { DataService } from '../../../core/services/data.service';
import { Product, User } from '../../../shared/interface';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { EditorComponent } from '../../dialogs/editor/editor.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  selectedCategoryName!: string;
  products: Product[] = [];
  isAdmin!:boolean;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router,
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedCategoryName = params['name'];
      this.dataService
        .getCategoryByName(this.selectedCategoryName)
        .pipe(take(1))
        .subscribe((data) => {
          this.products = data;
        });
    });
    this.dataService.products$.subscribe((products) => {
      this.products = products;
    });
    const userObject = localStorage.getItem('currentUser');
    let userStatus: User; 
    if (userObject) {
      userStatus = JSON.parse(userObject);
      this.isAdmin=userStatus.isAdmin
    } 
  }
  openDialog(item: Product) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      height: '35%',
      data: item,
    });
  }
  onBack(): void {
    this.router.navigate(['']);
  }
  openModalWindow(action: string, item?: Product): void {
    const isEdit = action === 'edit';
     this.dialog.open(EditorComponent, {
      width: '35%',
      height: '50%',
      data: isEdit
        ? { item: item, isEdit: true }
        : { item: null, isEdit: false, selectedCategoryName: this.selectedCategoryName },
    });
  }
}
