import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { DataService } from '../../../core/services/data.service';
import { Category } from '../../../shared/interface';
import { take } from 'rxjs';



@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private dataService: DataService,
  ) {}
  ngOnInit() {
    this.dataService.getCategories().pipe(take(1)).subscribe((data) => {
      this.categories = data;
    });
  }
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}
