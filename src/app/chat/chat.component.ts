import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { Router } from '@angular/router';
import { Message } from '../message';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  user_room: any;

  messages: any;
  users: any;

  constructor(private router: Router,
     private historyService: HistoryService) {
      this.user_room = this.router.getCurrentNavigation().extras.state.user_room;
     }

  // Get messages history from server
  getMessages(room_id: String){
    return new Promise(resolve => {
    this.historyService.getMessages(room_id)
      .subscribe((result:any) => {
        this.messages = result.data;
      resolve(this.messages);
      });
    });
  }

  getUsers(user_ids: Array<String>){
    this.historyService.getUsers(user_ids)
      .subscribe((result:any) => {
        this.users = result.data;
      });
  }

  getThumbnail(user_id: string){
    if(this.users){
      for(let user of this.users){
        if (user['user_id'] == user_id ){
          return user['thumbnail'];
        }
      }
    }
  }

  // post message
  message: string;
  postMessage(){
    
    if(this.message){
      console.log(this.message);
      let sendMessage: Message = {
        room_id : this.user_room.room_id,
        context: this.message,
        from: this.user_room.user_id,
        message_id: null,
        timestamp: Math.round(new Date().getTime()/1000) 
      };
      console.log(sendMessage);

      this.historyService.addMessage(sendMessage);
      this.messages.push(sendMessage);
    } else {
      alert("Need message");
    }
    this.message = '';
  }


  ngOnInit() {
    this.getMessages(this.user_room['room_id']).then((messages:[]) =>{
      // sort messages
      messages = messages.sort((obj1, obj2) => {
        return obj1['timestamp'] > obj2['timestamp'] ? 1 : -1;
      });

      // get users 
      if (this.messages != null){
        var user_ids: string[] = new Array();

        user_ids.push(this.user_room['user_id']);

        for( let message of this.messages ){
          user_ids.push(message['from']);
        }

        console.log(user_ids);

        if(user_ids != null){
          this.getUsers(user_ids);
        }
      }
    });

  }

  back(){
    this.router.navigate(['']);
  }



}
