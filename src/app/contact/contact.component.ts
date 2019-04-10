import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
   
  user_rooms: any;
  rooms: any;
  user_id = "5b92fae0dc9a9449b436d403";

  constructor(private historyService: HistoryService,
    private router: Router) { }

  
  // get user rooms objects
  getUserRooms(user_id: String){
    return new Promise(resolve => {
    this.historyService.getUserRooms(user_id)
      .subscribe((result:any) => {
        this.user_rooms = result.data;
      resolve(this.user_rooms);
      });
    });
  }


  // gat all the room objects returned by user_room
  getRooms(room_ids: Array<String>): void{
    this.historyService.getRooms(room_ids)
      .subscribe((result:any) => {
        this.rooms = result.data;
      });
  }

  // Go to specific chat
  toChat(i: number){
  this.router.navigate(['/chat/' + this.user_id + '/' + this.user_rooms[i].room_id],{state: { user_room: this.user_rooms[i] } });

    console.log('Navigate to ' + this.user_rooms[i]['room_id']);
  }

  ngOnInit() {
    this.getUserRooms(this.user_id).then((user_rooms:[]) =>{
      
      // sort the most recent
      user_rooms = user_rooms.sort((obj1, obj2)  =>{
        return obj1['timestamp'] < obj2['timestamp']? 1:-1;
      });
      
      // Get rooms
      if (this.user_rooms === undefined || this.user_rooms.length == 0) {
        console.log("is empty");
      } else {
          var room_ids: string[] = new Array();

          for(let user_room of this.user_rooms ){
            room_ids.push(user_room['room_id']);
          }
          
          if(room_ids != null){
            this.getRooms(room_ids);
          }
      }
      });

    }

    
}
