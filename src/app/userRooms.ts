export class UserRooms{
    UserID: String; // Who sent the message
    RoomID: String; // Which room the message is from
    Message: String; // The last message from the room to display
    Timestamp: Number; // What is the last time user open this rooms -> indicate new messages.
}