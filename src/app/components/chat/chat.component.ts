import { Message } from './../../model/MessageDTO';
import { ActivatedRoute } from '@angular/router';

import { TokenClaim } from './../../services/tokenclaim.service';
import { HttpClient } from '@angular/common/http';
import { SignalrService } from './../../services/signalR.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  filter:string="";
  MessageDTOList:Message[]=[];
  userId:number;
  receiverId:number;
  role:string;
  constructor(
    public signalRService: SignalrService,
    private http: HttpClient,
    private activatedRoute:ActivatedRoute,
    private tokenClaim:TokenClaim) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    //this.signalRService.addTransferChartDataListener(this.tokenClaim.getid(),4002);   
    //this.startHttpRequest();
    this.userId = this.tokenClaim.getid();
    this.getClientId()
    this.getRole()
    window.onload = function() {
      document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
    }
  }

  getRole(){
    this.role = this.tokenClaim.getclaims();
  }

  getAllMessages(){
    this.signalRService.getMessages(this.receiverId,+this.userId).subscribe(res=>{
      console.log(res);
      
      this.MessageDTOList = res
    })
  }

  getClientId(){
    this.activatedRoute.params.subscribe(params =>{
      this.receiverId = +params["ReceiverId"];
      this.set()
      this.getAllMessages()
    })
  }
  
  getName(){
    
  }

  set(){
    this.signalRService.hubConnection.on(`ReceiveMessage${this.tokenClaim.getid()}-${this.receiverId}`, (data:Message) => {
      this.MessageDTOList.push(data);
      console.log(data);
      console.log(this.userId);
      
      if(data.receiverId == this.userId){

        this.readed(data)
      }
      
      
    });
  }
  send(){
    let messageDTO:Message=
  {senderId:+this.tokenClaim.getid(),
    receiverId:this.receiverId,
    messages:this.filter}
    console.log(messageDTO);
    this.signalRService.invokeTest(messageDTO); 

    this.filter=""

  }

  readed(message:Message){
    console.log(1);
    this.signalRService.readed(message);
  }

  
}