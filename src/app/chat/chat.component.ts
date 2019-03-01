import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  room_id;
  user_id;

  constructor(private router: Router) {
      this.room_id = this.router.getCurrentNavigation().extras.state.room;
      this.user_id = this.router.getCurrentNavigation().extras.state.user;
     }

  ngOnInit() {
    
  }

  back(){
    this.router.navigate(['']);
  }



}
