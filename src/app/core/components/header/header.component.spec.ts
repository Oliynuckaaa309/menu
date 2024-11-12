import { ComponentFixture,  TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "../../services/auth/auth.service";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { of } from "rxjs";
import { MaterialModule } from "../../../shared/material.module";
import { Product } from "../../../shared/interface";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/store.index";
import { AuthorizationComponent } from "../../../menu/pages/authorization/authorization.component";


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockStore: jasmine.SpyObj<Store<AppState>>;
  let mockDialogRef: MatDialogRef<AuthorizationComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;


  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['logOut', ' pushFirstNameEvent']);
    mockDialogRef = jasmine.createSpyObj('MatDialog', ['open']);
    mockStore = jasmine.createSpyObj('Store', ['select']);
    mockStore.select.and.returnValue(of([]));
    mockAuthService.userName$ = of('Viktoria');
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, HeaderComponent, NoopAnimationsModule, MaterialModule ],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: Store, useValue: mockStore},
        {provide: MatDialog, useValue: dialogSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    mockDialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('it should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should set userName ', () => {
    component.ngOnInit();
    expect(component.userName).toBe('Viktoria');
  });

  it('should logOut ', () => {
    component.logOut();
    expect(mockAuthService.logOut).toHaveBeenCalled();
  });

  it('should filter the products ', () => {
    const products: Product[] = [
      {
        id: 1,
        name: 'banana',
        weight: '500ml',
        price: 700,
        ingredients: 'banana',
        image: 'images/ic.svg',
        categoryName: '3'
      }
    ];
    mockStore.select.and.returnValue(of(products));
    component.onSearch({target: {value: 'banana'}} as unknown as Event);
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('banana');
  });
});

