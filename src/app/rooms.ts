export class Rooms{
    RoomID: String; 
    UserIDs: Array<String>; // An array of IDs in the room
    RoomType: String; // What is the room for: Discussion, one to one, class
    LastMessage: String; // The last message sent in this room
}