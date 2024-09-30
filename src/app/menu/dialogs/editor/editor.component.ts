import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Product,
  ProductModalWindowData,
} from '../../../shared/interface';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/store.index";
import {createProduct, updateProduct} from "../../../../store/products/products.actions";
@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent implements OnInit {
  categoryDishForm:FormGroup = this.fb.group({
    name: ['', Validators.required],
    weight: ['', [Validators.required, Validators.min(1)]],
    price: ['', Validators.required],
    ingredients: ['', Validators.required],
    image: ['', Validators.required],
  });
  isEdit: boolean;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModalWindowData,
    private store: Store<AppState>
  ) {
    this.isEdit = data.isEdit;
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
        this.store.dispatch(updateProduct({product: updatedDish}));
        this.dialogRef.close();
       } else {
        const newDish: Product = productData;
        newDish.categoryName = this.data.selectedCategoryName!;
        this.store.dispatch(createProduct({product: newDish, category: newDish.categoryName}));
        this.dialogRef.close();
      }
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
