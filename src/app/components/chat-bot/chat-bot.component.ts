import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [],
  templateUrl: './chat-bot.component.html'
})
export class ChatBotComponent {

  chatBot:boolean=false;

  showChat(){
    this.chatBot = !this.chatBot
  }

}
