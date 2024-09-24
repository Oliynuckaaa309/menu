import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Product,
  ProductModalWindowData,
} from '../../../shared/interface';
import { DataService } from '../../../core/services/data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent {
  categoryDishForm: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModalWindowData,
    private dataService: DataService,
  ) {
    this.isEdit = data.isEdit;
    this.categoryDishForm = this.fb.group({
      name: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(1)]],
      price: ['', Validators.required],
      ingredients: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.isEdit && this.data.item) {
      this.categoryDishForm.patchValue(this.data.item);
    }
  }

  onSubmit(): void {
    let updatedDish: Product;
    if (this.categoryDishForm.valid) {
      const productData = this.categoryDishForm.value;
      if (this.isEdit) {
        updatedDish = {
          id: this.data.item.id,
          categoryName: this.data.item.categoryName,
          ...productData,
        };

        this.dataService.updateProduct(updatedDish).subscribe({
          next: (result) => {
            this.dialogRef.close(result);
          },

          error: (error) => {
            console.error('Error updating product:', error);
          },
        });
      } else {
        const newDish: Product = productData;
        newDish.categoryName = this.data.selectedCategoryName!        
        this.dataService.addProducts(newDish, this.data.selectedCategoryName!).subscribe({
          next: (result) => this.dialogRef.close(result),
          error: (error) => console.error('Error adding product:', error),
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
