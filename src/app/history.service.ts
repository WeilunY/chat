import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private messages_api_url = "http://localhost:3000/api/messages/";
  private users_api_url = "http://localhost:3000/api/users/ids/?";

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

    return this.http.get(this.rooms_api_url + url);
  }

  // Use room_id to get list of chat history
  getMessages(room_id: String){
    return this.http.get(this.messages_api_url + room_id);
  }

  // get users by user_ids
  getUsers(user_ids: Array<String>){
    length = user_ids.length;
    var url: string = '';

    for(var i = 0; i < length; i++){

      if(i + 1 == length){
        url += "ids[]="+user_ids[i];
      } else {
        url += "ids[]="+user_ids[i]+"&";
      } 
    }
    console.log(this.users_api_url +url);
    return this.http.get(this.users_api_url +url);
  }
}
