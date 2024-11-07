export interface Message {
  roomId: string;
  content: string;
  sender: string;
  timestamp: Date | string; // Allow both Date and string for flexibility
}

// export interface Message {
//   _id: string;
//   content: string;
//   sender: string; // Användarens ID som skickade meddelandet
//   timestamp: Date;
//   channelId?: string; // Valbart, om meddelandet skickades i en kanal
//   recipientId?: string; // Valbart, om meddelandet är ett direktmeddelande
// }
