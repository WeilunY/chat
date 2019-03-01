import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
   
  user_rooms;
  user_id = "5b92fae0dc9a9449b436d403";

  constructor(private historyService: HistoryService) { }


  getUserRooms(user_id: String): void {
    this.historyService.getUserRooms(user_id)
      .subscribe((result:any) => {
        console.log(result)
        this.user_rooms = result.data;
      });
  
  }

  ngOnInit() {
    this.getUserRooms(this.user_id);
  }
}
