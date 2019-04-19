/**
 * @author Weilun Yao
 * 
 * Description: 
 * This is the history service (http client) for the app. It will call the apis from ClassFusion API to retrives data
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message';
import { UserRooms } from './userRooms';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private http: HttpClient,
    ) { }

  // urls for apis :
  private get_user_rooms_api_url = "http://localhost:3000/api/user_rooms/get_userroom/";
  private update_user_rooms_api_url = "http://localhost:3000/api/user_rooms/update_userroom/";

  private rooms_api_url = "http://localhost:3000/api/rooms/ids/?";

  private get_messages_api_url = "http://localhost:3000/api/messages/get_messages/";
  private post_message_api_url = "http://localhost:3000/api/messages/post_message/";

  private users_api_url = "http://localhost:3000/api/users/ids/?";

  /**
   * This method retrives a list of user_rooms
   * Used in contatct component
   * @param user_id 
   */
  getUserRooms(user_id: String){
    return this.http.get(this.get_user_rooms_api_url + user_id);
  }

  /**
   * This method retrives a single user_room
   * Used in contatct component
   * @param user_id 
   */
  getOneUserRoom(user_id: String, room_id: String){
    return this.http.get(this.get_user_rooms_api_url + user_id + '/' + room_id);
  }

  /**
   * This method retrives a list of rooms
   * Used in contatct component
   * @param room_ids
   */
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

  /**
   * This method retrives a list of messages
   * Used in Chat component
   * @param room_id 
   */
  getMessages(room_id: String){
    return this.http.get(this.get_messages_api_url + room_id);
  }

  /**
   * This method retrives a list of users
   * Used in Chat component
   * @param user_ids
   */
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

  /**
   * This method send a message object to the database
   * Used in Chat component
   * @param message
   */
  addMessage (message: Message) {
    return this.http.post(this.post_message_api_url, message).toPromise().then((result: any) => {
      console.log('Result: ', result)
    });
   }

   /**
   * This method updates the last message and timestamp in exsited user_room
   * Used in Chat component
   * @param room_data
   */
   updateUserRoom (room_data: UserRooms){
     console.log("update user room called");
      return this.http.put(this.update_user_rooms_api_url + room_data['user_id'] + "/" + room_data['room_id'] , room_data).toPromise().then((result:any) => {
        console.log('Result: ', result)
      });
   }
}
