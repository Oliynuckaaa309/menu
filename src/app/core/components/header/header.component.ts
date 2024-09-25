import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { DataService } from '../../services/data.service';
import { Product } from '../../../shared/interface';
import { take } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  constructor(private dataService: DataService) {}
  ngOnInit() {
   this.dataService
      .getAllProducts()
      .pipe(take(1))
      .subscribe((data) => (this.allProducts = data));
  }
  onSearch(eventSearch: Event) {
    const searchTerm = (
      eventSearch.target as HTMLInputElement
    ).value.toLowerCase();
    if (!searchTerm) {
      this.filteredProducts = [];
    } else {
      this.filteredProducts = this.allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm),
      );
    }
  }
 
}
