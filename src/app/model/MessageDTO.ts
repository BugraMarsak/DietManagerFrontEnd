export interface Message{
    messageId?:number
    senderId:number;
    receiverId:number;
    messages:string;
    sendTime?:Date;
    IsreciverRead?:boolean

}
