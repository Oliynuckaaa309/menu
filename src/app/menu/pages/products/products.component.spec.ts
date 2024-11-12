import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsComponent } from './products.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MockStore } from "@ngrx/store/testing";
import { AppState } from "../../../../store/store.index";
import { of } from "rxjs";
import { Store } from "@ngrx/store";


describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockStore: MockStore<AppState>;
  let mockRouter: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;


  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    activatedRoute = {
      params: of({ name: 'rolls' }),
    } as any;
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, NoopAnimationsModule],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: activatedRoute },],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to home when onBack is called', () => {
    component.onBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });
});
