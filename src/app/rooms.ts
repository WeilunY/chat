export class Rooms{
    room_id: String; 
    users_id: Array<String>; // An array of IDs in the room
    room_type: String; // What is the room for: Discussion, one to one, class
    last_message: String; // The last message sent in this room
}