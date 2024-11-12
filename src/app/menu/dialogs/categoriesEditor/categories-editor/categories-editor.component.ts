import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { NgxMatFileInputModule } from "@angular-material-components/file-input";
import { Store } from "@ngrx/store";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductModalWindowData } from "../../../../shared/interface";
import { AppState } from "../../../../../store/store.index";
import { createCategory, updateCategory } from "../../../../../store/categories/categories.action";

@Component({
  selector: 'app-categories-editor',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    MatDialogActions
  ],
  templateUrl: './categories-editor.component.html',
  styleUrl: './categories-editor.component.css'
})
export class CategoriesEditorComponent implements OnInit {
  isEdit!: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoriesEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModalWindowData,
    private store: Store<AppState>
  ) {
    this.isEdit = data.isEdit;
  }

  ngOnInit(): void {
    if (this.isEdit && this.data.item) {
      this.categoryForm.patchValue(this.data.item);
    }
  }

  categoryForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    image: [null, Validators.required],
  });

  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      const formCategoryData = new FormData();
      formCategoryData.append('name', categoryData.name);
      formCategoryData.append('image', categoryData.image);
      if (this.isEdit) {
        this.store.dispatch(updateCategory({category: formCategoryData, id: this.data.item.id}));
        this.dialogRef.close();
      } else {
        this.store.dispatch(createCategory({category: formCategoryData,}));
        this.dialogRef.close();
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
