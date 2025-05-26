import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ChatBot } from '../../../Interface/models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [FormsModule,TranslateModule],
  templateUrl: './chat-bot.component.html'
})
export class ChatBotComponent {

  api = inject(ApiService);
  showBot:boolean=false;
  message = ''
  ChatBotMessage:ChatBot= {message:''};
  loadBot:boolean=false;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  chatMessages: any[] = [];

  constructor(private translate: TranslateService) {
    const translatedText = this.translate.instant('routes.contact.bot.message');

    this.chatMessages = [
      { bot: true, text: translatedText }
    ];
  }

  showChat(){
    this.showBot = !this.showBot
  }

  sendMessage() {
    if (this.message.trim()) {
        this.chatMessages.push({bot:false,text:this.message.trim()})
        this.ChatBotMessage.message = this.message.trim();
        this.message = '';
        setTimeout(() => {
          this.loadBot = !this.loadBot;
        }, 300);
        this.api.BotAsistant(this.ChatBotMessage).subscribe({
          next: (data) => {
            this.loadBot = !this.loadBot;
            this.chatMessages.push({bot:true,text:data.response})
          },
          error: (err) => {
            console.log("Ups")
          }
        });
      }
  }

  ngAfterViewChecked() {
    this.scrollAlFinal();
  }

  private scrollAlFinal() {
    const container = this.scrollContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
}
