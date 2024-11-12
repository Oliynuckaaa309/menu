import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorComponent } from './editor.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppState } from "../../../../store/store.index";
import { Product, ProductModalWindowData } from "../../../shared/interface";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let mockDialogRef: MatDialogRef<EditorComponent>
  let store: MockStore<AppState>;

  const mockedProduct : Product ={
    id: 2,
    name: 'rolls',
    weight: '300',
    price: 100,
    ingredients: 'water',
    categoryName: 'rolls',
    image: 'images/rolls.png'
  };
  const mockData: ProductModalWindowData = {
    isEdit: false,
    item: {
      id: 2,
      name: 'rolls',
      weight: '300',
      price: 100,
      ingredients: 'water',
      categoryName: 'rolls',
      image: 'images/rolls.png'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EditorComponent, NoopAnimationsModule, ReactiveFormsModule ],
      providers: [
        FormBuilder,
        {provide: MatDialogRef, useValue: {close: jasmine.createSpy('close')}},
        {provide: MAT_DIALOG_DATA, useValue: mockData},
        provideMockStore(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    mockDialogRef = TestBed.inject(MatDialogRef)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with expected values', () => {
    component.categoryDishForm.setValue({
      name: 'rolls',
      weight: '300',
      price: 100,
      ingredients: 'water',
      image: null
    });
    component.ngOnInit();
    expect(component.categoryDishForm.get('name')?.value).toBe('rolls');
    expect(component.categoryDishForm.get('weight')?.value).toBe('300');
    expect(component.categoryDishForm.get('price')?.value).toBe(100);
    expect(component.categoryDishForm.get('ingredients')?.value).toBe('water');
    expect(component.categoryDishForm.get('image')?.value).toBeNull();
  });

  it('should dispatch createProduct in create mode', () => {
    component.isEdit = false;
    spyOn(store, 'dispatch');
    component.categoryDishForm.setValue({
      name: 'rolls',
      weight: '300',
      price: 100,
      ingredients: 'water',
      image: 'new-sample.jpg'
    });
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: '[Products] Create Product'
    }));
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should dispatch updateProduct in update mode', () => {
    component.isEdit = true;
    spyOn(store, 'dispatch');
    component.categoryDishForm.setValue({
      name: 'updated rolls',
      weight: '300',
      price: 100,
      ingredients: ' updated water',
      image: 'new-sample.jpg'
    });
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: '[Products] Update Product'
    }));
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close the modal', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
