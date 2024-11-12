import { ComponentFixture,  TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MockStore } from "@ngrx/store/testing";
import { AppState } from "../../../../store/store.index";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { selectAllCategories } from "../../../../store/categories/categories.selector";


describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let mockStore: MockStore<AppState>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockDialog = jasmine.createSpyObj('MatDialog',['open']);

    await TestBed.configureTestingModule({
      imports: [ CategoryComponent, NoopAnimationsModule ],
      providers: [
        {provide: Store, useValue: mockStore },
        {provide: MatDialog, useValue: mockDialog}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get categories in ngOnInit', () => {
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type:'[Categories] Load Categories'
    }));
  });

  it('get categories from the store in ngOnInit', () => {
    component.ngOnInit();
    expect(mockStore.select).toHaveBeenCalledWith(selectAllCategories);
  });

  it('should open modal for adding', () => {
    expect(component).toBeTruthy();
  });

});
