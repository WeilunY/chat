export class Message{
    RoomID: String; // the room the message in
    Context: any; // The content of the message, can be any type: String, Picture file...
    From: String; // UserID of the Sender
    MessageID: String;
    Timestamp: Number; // The time it is sent
} 