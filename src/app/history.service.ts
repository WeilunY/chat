import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message';
import { UserRooms } from './userRooms';
//import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private http: HttpClient,
    ) { }

  
  private get_user_rooms_api_url = "http://localhost:3000/api/user_rooms/get_userroom/";
  private update_user_rooms_api_url = "http://localhost:3000/api/user_rooms/update_userroom/";

  private rooms_api_url = "http://localhost:3000/api/rooms/ids/?";
  private get_messages_api_url = "http://localhost:3000/api/messages/get_messages/";
  private post_message_api_url = "http://localhost:3000/api/messages/post_message/";
  private users_api_url = "http://localhost:3000/api/users/ids/?";

  // User user_id to get the rooms related
  getUserRooms(user_id: String){
    return this.http.get(this.get_user_rooms_api_url + user_id);
  }

  getOneUserRoom(user_id: String, room_id: String){
    return this.http.get(this.get_user_rooms_api_url + user_id + '/' + room_id);
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
    return this.http.get(this.get_messages_api_url + room_id);
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

  // post a message 
  addMessage (message: Message) {
    //console.log(message);
    return this.http.post(this.post_message_api_url, message).toPromise().then((result: any) => {
      console.log('Result: ', result)
    });
   }


   updateUserRoom (room_data: UserRooms){
     console.log("update user room called");
      return this.http.put(this.update_user_rooms_api_url + room_data['user_id'] + "/" + room_data['room_id'] , room_data).toPromise().then((result:any) => {
        console.log('Result: ', result)
      });
   }
}
