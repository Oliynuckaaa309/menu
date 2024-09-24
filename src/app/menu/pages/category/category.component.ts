import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { DataService } from '../../../core/services/data.service';
import { Category, Product } from '../../../shared/interface';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditorComponent } from '../../dialogs/editor/editor.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  categories: Category[] = [];
  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
  ) {}
  ngOnInit() {
    this.dataService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}
