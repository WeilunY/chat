/**
 * @author Weilun Yao
 * 
 * Description: 
 * This is the chat history component for the chatting app
 */

import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from '../message';
import { UserRooms } from '../userRooms';

//io
import { Event } from '../event';
import { SocketService } from '../socket.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  // user_id and room_id are loaded from url, and used to retrieve chat history from database
  user_id: String; 
  room_id: String;

  user_room: any;

  // messages is the chat history
  messages: any;

  // users is the user in the room, used to set income and outcome message
  users: any;

  // used for socketIO set up
  ioConnection: any;

  // used for updating latest message and timestamp for user_room
  latest_message: String;
  last_message: String; 


  constructor(private router: Router,
     private historyService: HistoryService, 
     private route: ActivatedRoute, 
     private socketService: SocketService) {
     }



  /**
   * This method will use user_id and room_id to retrive one user_room from historyService with API
   * @param user_id User's id
   * @param room_id Room's id
   */
  getOneUserRoom(user_id: String, room_id: String){
    return new Promise(resolve =>{
    this.historyService.getOneUserRoom(user_id, room_id)
      .subscribe((result: any) => {
        this.user_room = result.data;
        resolve(this.user_room);
      });
    });
  }

  /**
   * This method retrives the message history in the room.
   * @param room_id 
   */
  getMessages(room_id: String){
    return new Promise(resolve => {
    this.historyService.getMessages(room_id)
      .subscribe((result:any) => {
        this.messages = result.data;
      resolve(this.messages);
      });
    });
  }

  /**
   * This method uses a list of user_ids to retrives a list of users
   * @param user_ids 
   */
  getUsers(user_ids: Array<String>){
    this.historyService.getUsers(user_ids)
      .subscribe((result:any) => {
        this.users = result.data;
      });
  }

  /**
   * This method retrives the user thumbnail 
   * @param user_id 
   */
  getThumbnail(user_id: string){
    if(this.users){
      for(let user of this.users){
        if (user['user_id'] == user_id ){
          return user['thumbnail'];
        }
      }
    }
  }

  // Post Message:

  // temp variable for holding message
  message: string;

  /**
   * This method will send a new message from textfield to database
   */
  postMessage(){
    
    if(this.message){
      //console.log(this.message);

      // create a sending message object
      let sendMessage: Message = {
        room_id : this.user_room.room_id,
        context: this.message,
        from: this.user_room.user_id,
        message_id: null,
        timestamp: Math.round(new Date().getTime()/1000) 
      };
      //console.log(sendMessage);

      // send this message through history service
      this.historyService.addMessage(sendMessage);

      // send it through socektIO (live update)
      this.socketService.send(sendMessage);

    } else {
      alert("Need message");
    }
    this.latest_message = this.message;
    this.message = '';

  }

  /**
   * This method will return to the contact page with updates on last message and timestamp
   */
  back(){
    if (this.last_message != this.latest_message){

      // update user room
      let new_user_room: UserRooms = {
        user_id: this.user_room.user_id,
        room_id: this.user_room.room_id,
        message: this.latest_message,
        timestamp: Math.round(new Date().getTime()/1000),
        title: this.user_room.title,
        thumbnail: this.user_room.thumbnail,
        
      }; 

      this.historyService.updateUserRoom(new_user_room);
    }
    
    this.router.navigate(['contact/' + this.user_id]);
  }

  /**
   * This method connect to the socketIO server
   */
  private initIoConnection(): void {
    this.socketService.initSocket();

    // send message
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });
      
    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  

  ngOnInit() {

    // init socketIO
    this.initIoConnection();

    //get params from url
    this.route.paramMap.subscribe(params => {
      this.user_id = params.get("user_id");
      this.room_id = params.get("room_id");
      //console.log(this.user_id + ' 11111 ' + this.room_id);
    });

  
    // getUserRoom with user and room id
    this.getOneUserRoom(this.user_id, this.room_id).then((user_room: any) => {
      console.log(user_room);

      this.getMessages(user_room['room_id']).then((messages:[]) =>{

        // sort messages
        messages = messages.sort((obj1, obj2) => {
          return obj1['timestamp'] > obj2['timestamp'] ? 1 : -1;
        });
  
        // last message
        if (messages.length > 1){
          this.last_message = messages[messages.length - 1]['context'];
          console.log(this.latest_message);
        }
        
  
        // get users 
        if (this.messages != null){
          var user_ids: string[] = new Array();
  
          user_ids.push(this.user_room['user_id']);
  
          for( let message of this.messages ){
            user_ids.push(message['from']);
          }
  
          //console.log(user_ids);
  
          if(user_ids != null){
            this.getUsers(user_ids);
          }
        }
      });
    })


  }



}
