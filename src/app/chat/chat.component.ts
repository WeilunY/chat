import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  room_id: string;
  user_id: string;
  messages: any;

  constructor(private router: Router,
     private historyService: HistoryService) {
      this.room_id = this.router.getCurrentNavigation().extras.state.room;
      this.user_id = this.router.getCurrentNavigation().extras.state.user;
     }

  getMessages(room_id: String){
    this.historyService.getMessages(room_id)
      .subscribe((result:any) => {
        console.log(result);
        this.messages = result.data;
      })
  }

  ngOnInit() {
    this.getMessages(this.room_id);
  }

  back(){
    this.router.navigate(['']);
  }



}
