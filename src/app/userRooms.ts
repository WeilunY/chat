export class UserRooms{
    user_id: String; // Who sent the message
    room_id: String; // Which room the message is from
    message: String; // The last message from the room to display
    timestamp: Number; // What is the last time user open this rooms -> indicate new messages.
    title: String;
    thumbnail: String;
}