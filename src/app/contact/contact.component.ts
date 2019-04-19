/**
 * @author Weilun Yao
 * 
 * Description: 
 * This is the contacts component for the chatting app
 * 
 * NOTE: Use localhost:4200/contact/:user_id to start the app
 *       localhost:4200 itself will only return an empty page
 */

import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  
  // user_rooms object to populate the contact page
  user_rooms: any;
  rooms: any;

  // temporary user_id
  user_id = "5b92fae0dc9a9449b436d403";

  constructor(private historyService: HistoryService,
    private router: Router,
    private route: ActivatedRoute) { }

  
  /**
   * This method retirives a list of user_rooms
   * @param user_id 
   */
  getUserRooms(user_id: String){
    return new Promise(resolve => {
    this.historyService.getUserRooms(user_id)
      .subscribe((result:any) => {
        this.user_rooms = result.data;
      resolve(this.user_rooms);
      });
    });
  }


  /** 
   * get all the room objects returned by user_room
   * @param room_ids
   * */
  getRooms(room_ids: Array<String>): void{
    this.historyService.getRooms(room_ids)
      .subscribe((result:any) => {
        this.rooms = result.data;
      });
  }

  /**
   * This method navigates to specific chat history page
   * @param i specific chat
   */
  toChat(i: number){
  this.router.navigate(['chat/' + this.user_id + '/' + this.user_rooms[i].room_id],{state: { user_room: this.user_rooms[i] } });

    console.log('Navigate to ' + this.user_rooms[i]['room_id']);
  }

  ngOnInit() {

    // get params from url
    this.route.paramMap.subscribe(params => {
      this.user_id = params.get("user_id");
      console.log(this.user_id);
    });

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
