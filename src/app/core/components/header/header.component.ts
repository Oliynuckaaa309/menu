import { Component,  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { DataService } from '../../services/data.service';
import { Product, User } from '../../../shared/interface';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationComponent } from '../../../menu/pages/authorization/authorization.component';
import { AuthService } from '../../services/auth/auth.service';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/store.index";
import {loadAllProducts} from "../../../../store/products/products.actions";
import {selectAllProducts} from "../../../../store/products/products.selector";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  filteredProducts: Product[] = [];
  userName!:string ;

  constructor(private dataService: DataService,
    private dialog: MatDialog,
    private authService: AuthService,
    private store: Store<AppState>) { }
  ngOnInit() {
    this.store.dispatch(loadAllProducts());
    this.authService.userName$.subscribe(data => {
       this.userName = data as string;
       const user= window.localStorage.getItem('currentUser');
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
      this.store.select(selectAllProducts).subscribe(data =>
         this.filteredProducts = data.filter((product) =>
        product.name.toLowerCase().includes(searchTerm),
      ));
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
