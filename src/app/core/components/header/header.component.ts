import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { DataService } from '../../services/data.service';
import { Product, User } from '../../../shared/interface';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationComponent } from '../../../menu/pages/authorization/authorization.component';
import { AuthService } from '../../services/auth/auth.service';


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
  userName: string | null = null;
  constructor(private dataService: DataService,
    private dialog: MatDialog,
    private authService: AuthService) { }
  ngOnInit() {
    this.dataService
      .getAllProducts()
      .pipe(take(1))
      .subscribe((data) => (this.allProducts = data));
    this.authService.userName$.subscribe(data => {
       this.userName = data as string;
      const user= localStorage.getItem('currentUser');
      if(user){
        const currentUser = JSON.parse(user);
        this.userName = currentUser.firstName;
      }

    });
   

   
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
  showAuthorizationWindow(): void {
    this.dialog.open(AuthorizationComponent, {
      maxHeight: '65%',
      width: '35%'
    })
  }
  logOut(): void {
    localStorage.removeItem('currentUser');
    this.authService.logOut();
   
  }

}
