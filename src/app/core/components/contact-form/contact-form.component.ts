import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit, QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgForm } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { Message, MessageResponse, UserResponse } from "../../../shared/interface";
import { SocketIoService } from "../../services/socket/socket-io.service";
import { ChatService } from "../../services/chat/chat.service";
import { WatchedMessageDirectiveDirective } from "./watchedMessageDirective/watched-message-directive.directive";


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, WatchedMessageDirectiveDirective],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit, OnDestroy, AfterViewInit {
  public allMessages: MessageResponse[] = [];
  public newMessage!: string;
  public isSupport!: boolean;
  public supportId: number = 3;
  public userId!: number;
  public userEmail!: string;
  public allUsers: UserResponse[] = [];
  public certainUserId!: number;
  public currentUserName!: string;
  @ViewChild('chatContainer') public chatContainer: ElementRef | undefined;
  @ViewChildren('message') messageElements!: QueryList<ElementRef>;

  constructor(public dialogRef: MatDialogRef<ContactFormComponent>,
              public socketService: SocketIoService,
              public chatService: ChatService,
              ) {
  }

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id;
      this.userEmail = user.email
      this.isSupport = this.userEmail === 'support@gmail.com';
      this.initializeChat();
      this.getMessage();
    }
    this.chatService.getAllUsersForSupport().subscribe((data) => {
      this.allUsers = data;
    })
  }

initializeChat(): void {
  if (!this.isSupport) {
    this.socketService.joinRoom(this.userId);
    this.chatService.getPreviousMessage(this.userId).subscribe(data => {
      this.allMessages = data;
      this.scrollToFirstUnreadMessage();
    })
  }
  else {
    this.socketService.joinRoom(this.supportId);
  }
}

getMessage(): void{
  this.socketService.getMessage().subscribe((message) => {
    if(message.sender_id === 0){
      let user = this.allUsers.find(user => user.id === +message.message);
      if(user) {
        if(this.certainUserId !== +message.message) {
          user.unread_count = +user.unread_count + 1;
        }
      }
    } else {
      this.allMessages.push(message);
      this.scrollToFirstUnreadMessage();
    }
  })
}
  ngAfterViewInit(): void {
    this.scrollToFirstUnreadMessage();
  }

  scrollToFirstUnreadMessage(): void{
    setTimeout(() => {
    const firstUnreadMessage= this.messageElements.find((element, index)=>{ return !this.allMessages[index].read_by_support});
    if(firstUnreadMessage){
      firstUnreadMessage.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    }, 500)
  }

  joinRoomForSupport(id: number, name: string) {
    this.certainUserId = id;
    this.currentUserName = name;
    this.socketService.joinRoom(id);
    this.chatService.getPreviousMessage(this.certainUserId).subscribe(data => {
      this.allMessages = data;
      this.scrollToFirstUnreadMessage();
    })
  };

  public scrollToBottom(): void {
    setTimeout(() => {
      if (!this.chatContainer) {
        return;
      }
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 1000);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(formRef: NgForm): void {
    const senderId = this.isSupport ? this.supportId : this.userId;
    const recipientId = this.isSupport ? this.certainUserId : this.supportId;
    const createdMessage: Message = {
      senderId: senderId,
      recipientId: recipientId,
      message: this.newMessage
    }
    if (this.newMessage && this.newMessage.trim() !== '') {
      this.socketService.sendMessage(createdMessage);
      this.newMessage = '';
      formRef.resetForm();
    }
    this.scrollToBottom();
  }

  onMessageWatched(message: MessageResponse): void {
    let user = this.allUsers.find(user => user.id === this.certainUserId);
    if (user && !message.read_by_support && message.sender_id !== this.userId) {
      user.unread_count = +user.unread_count - 1;
      message.read_by_support = true;
      this.socketService.markMessageAsRead(message.id);
    }
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
