import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesEditorComponent } from './categories-editor.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ProductModalWindowData } from "../../../../shared/interface";
import { Store } from "@ngrx/store";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

describe('CategoriesEditorComponent', () => {
  let component: CategoriesEditorComponent;
  let fixture: ComponentFixture<CategoriesEditorComponent>;
  let mockDialogRef: MatDialogRef<CategoriesEditorComponent>
  let store: Store;

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
      imports: [ CategoriesEditorComponent, NoopAnimationsModule, ReactiveFormsModule ],
      providers: [
        FormBuilder,
        {provide: MatDialogRef, useValue: {close: jasmine.createSpy('close')}},
        {provide: MAT_DIALOG_DATA, useValue: mockData},
        provideMockStore(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoriesEditorComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    mockDialogRef = TestBed.inject(MatDialogRef)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form', () => {
    fixture.detectChanges();
    expect(component.categoryForm).toBeDefined();
    expect(component.categoryForm.controls['name'].value).toBe('');
    expect(component.categoryForm.controls['image'].value).toBeNull();
  });

  it('should initialize form with data if in edit mode', () => {
    component.isEdit = true;
    component.data = {
      isEdit: true, item: {
        id: 2,
        name: 'rolls',
        weight: '300',
        price: 100,
        ingredients: 'water',
        categoryName: 'rolls',
        image: 'images/rolls.png'
      }
    };
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.categoryForm.controls['name'].value).toBe('rolls');
  });

  it('should make a form invalid where fields are empty', () => {
    component.categoryForm.controls['name'].setValue('');
    component.categoryForm.controls['image'].setValue(null);
    expect(component.categoryForm.valid).toBeFalsy()
  });
  it('should make a form valid where fields are filled', () => {
    component.categoryForm.controls['name'].setValue('Pizza');
    component.categoryForm.controls['image'].setValue(new File([], 'image.jpg'));
    expect(component.categoryForm.valid).toBeTruthy()
  });

  it('should close the dialog on cancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
