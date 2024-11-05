import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from '../../../shared/material.module';
import { Message, MessageResponse, UserResponse } from "../../../shared/interface";
import { SocketIoService } from "../../services/socket/socket-io.service";
import { ChatService } from "../../services/chat/chat.service";


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit, OnDestroy, AfterViewInit {
  public allMessages: MessageResponse[] = [];
  public newMessage!: string;
  public createdMessage!: Message;
  public isSupport!: boolean;
  public supportId: number = 3;
  public userId!: number;
  public allUsers: UserResponse[] = [];
  public certainUserId!: number;
  public currentUserName!: string;
  @ViewChild('chatContainer') public chatContainer: ElementRef | undefined;

  constructor(public dialogRef: MatDialogRef<ContactFormComponent>,
              public socketService: SocketIoService,
              public chatService: ChatService) {
  }

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id;
      this.isSupport = user.email === 'support@gmail.com';
      if (!this.isSupport) {
        this.socketService.joinRoom(this.userId);
        this.chatService.getPreviousMessage(this.userId).subscribe(data => {
          this.allMessages = data;
          this.scrollToBottom()
        })
      }
      this.socketService.getMessage().subscribe((message) => {
        this.allMessages.push(message);
        this.scrollToBottom();
      })
    }
    this.chatService.getAllUsersForSupport().subscribe((data) => {
      this.allUsers = data;
    })
  }
  ngAfterViewInit() {
    this.scrollToBottom();
  }

  joinRoomForSupport(id: number, name: string) {
    this.certainUserId = id;
    this.currentUserName = name;
    this.socketService.joinRoom(id);
    this.chatService.getPreviousMessage(this.certainUserId).subscribe(data => {
      this.allMessages = data;
      this.scrollToBottom();
    })
  };
  public scrollToBottom(): void {
    setTimeout(() => {
      if(!this.chatContainer) {
        return;
      }
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 100);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const senderId = this.isSupport ? this.supportId : this.userId;
    const recipientId = this.isSupport ? this.certainUserId : this.supportId;
    this.createdMessage = {
      senderId: senderId,
      recipientId: recipientId,
      message: this.newMessage
    }
    this.socketService.sendMessage(this.createdMessage);
    this.newMessage = '';
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
