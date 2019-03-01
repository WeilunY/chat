import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private http: HttpClient,
    ) { }

  
  private user_rooms_api_url = "http://localhost:3000/api/user_rooms/user/";
  private rooms_api_url = "http://localhost:3000/api/rooms/ids/?";
  

  // User user_id to get the rooms related
  getUserRooms(user_id: String){
    return this.http.get(this.user_rooms_api_url + user_id);
  }

  // User an array of room_ids to get rooms
  getRooms(room_ids: Array<String>){
    length = room_ids.length;
    var url: string = '';

    for(var i = 0; i < length; i++){
      
      if(i + 1 == length){
        url += "ids[]="+room_ids[i];
      } else {
        url += "ids[]="+room_ids[i]+"&";
      }
      
    }

    console.log(url);
    return this.http.get(this.rooms_api_url + url);
  }

  // Use room_id to get list of chat history
  getMessages(room_ids: String){
    return 
  }

}
