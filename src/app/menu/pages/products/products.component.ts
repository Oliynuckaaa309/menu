import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { Product } from '../../../shared/interface';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { EditorComponent } from '../../dialogs/editor/editor.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  selectedCategoryName!: string;
  products: Product[] = [];
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
        .subscribe((data) => {
          this.products = data;
        });
    });
    this.dataService.products$.subscribe((products) => {
      this.products = products;
    });
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