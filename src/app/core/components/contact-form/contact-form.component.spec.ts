import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactFormComponent } from './contact-form.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ChatService } from "../../services/chat/chat.service";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/store.index";
import { MatDialogRef} from "@angular/material/dialog";
import { SocketIoService } from "../../services/socket/socket-io.service";
import { NgForm } from "@angular/forms";


describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let mockChatService: jasmine.SpyObj<ChatService>;
  let mockSocketService: jasmine.SpyObj<SocketIoService>;
  let mockStore: jasmine.SpyObj<Store<AppState>>;

  beforeEach(async () => {
    mockChatService = jasmine.createSpyObj('ChatService', ['getAllUsersForSupport', 'getPreviousMessage',]);
    mockSocketService = jasmine.createSpyObj('SocketIoService', ['joinRoom', 'getMessage', 'sendMessage', 'disconnect', 'markMessageAsRead']);
    mockStore = jasmine.createSpyObj('Store', ['select']);
    mockChatService.getAllUsersForSupport.and.returnValue(of([{
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      isAdmin: false,
      createdAt: new Date(),
      sender_id: 100,
      unread_count: 5
    }]));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ContactFormComponent, NoopAnimationsModule],
      providers: [
        {provide: ChatService, useValue: mockChatService},
        {provide: MatDialogRef, useValue: {close: jasmine.createSpy('close')}},
        {provide: Store, useValue: mockStore},
        {provide: SocketIoService, useValue: mockSocketService},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;

    mockSocketService.getMessage.and.returnValue(of());
    mockChatService.getAllUsersForSupport.and.returnValue(of([]));
    mockChatService.getPreviousMessage.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call getAllUsersForSupport  ', () => {
    component.ngOnInit();
    expect(mockChatService.getAllUsersForSupport).toHaveBeenCalled();
  });

  it('should join the user room ', () => {
    component.isSupport = false;
    component.userId = 1;
    component.initializeChat();
    expect(mockSocketService.joinRoom).toHaveBeenCalledWith(component.userId);
  });

  it('should join the support room ', () => {
    component.isSupport = true;
    component.initializeChat();
    expect(mockSocketService.joinRoom).toHaveBeenCalledWith(component.supportId);
  });

  it('should send message on submit if newMessage is not empty', () => {
    component.newMessage = 'Hello';
    component.isSupport = false;
    component.userId = 1;
    component.onSubmit({resetForm: jasmine.createSpy()} as unknown as NgForm);
    expect(mockSocketService.sendMessage).toHaveBeenCalledWith(jasmine.objectContaining({
      senderId: component.userId,
      message: 'Hello'
    }));
    expect(component.newMessage).toBe('');
  });

  it('should close the dialog ', () => {
    component.onClose();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
