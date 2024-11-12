import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Product } from "../../../shared/interface";

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let mockDialogRef: MatDialogRef<DialogComponent>;
  const mockData: Product = {
    id: 2,
    name: 'rolls',
    weight: '300',
    price: 100,
    ingredients: 'water',
    categoryName: 'rolls',
    image: 'images/rolls.png'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {close: jasmine.createSpy('close')}},
        {provide: MAT_DIALOG_DATA, useValue: mockData}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    mockDialogRef = TestBed.inject(MatDialogRef)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal window', () => {
    component.closeModalDialog();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
