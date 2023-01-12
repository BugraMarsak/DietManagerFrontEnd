import { ListResponseModel } from './../model/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { TokenClaim } from './tokenclaim.service';
import { Message } from './../model/MessageDTO';
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Observable } from 'rxjs';
import { AlertDTO } from '../model/alertDTO';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  url:string = "https://localhost:7240/api/ChatHub"
  
  constructor(private httpClient:HttpClient) { }
  public hubConnection: signalR.HubConnection
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:7240/Message',{
                                                            skipNegotiation: true,
                                                            transport: signalR.HttpTransportType.WebSockets
                                                          })
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }



    public addTransferChartDataListener(id:number,senderId:number)  {
        console.log(123);
        console.log(`ReceiveMessage${id}-${senderId}`);
        
      this.hubConnection.on(`ReceiveMessage${id}-${senderId}`, (data) => {

        console.log(data);
        
      });
    }

public invokeTest(message:Message){
  
  this.hubConnection.invoke('SendMessage1',message)
}

public readed(message:Message){
  
  this.hubConnection.invoke('MessageReaded',message)
}

getMessages(receiverId:number,senderId:number):Observable<Message[]>{
  
  return this.httpClient.
  get<Message[]>(`${this.url}/getMessages?receiverId=${+receiverId}&senderId=${senderId}`)
}

getAlerts(userId:number):Observable<ListResponseModel<AlertDTO>>{
  return this.httpClient.
  get<ListResponseModel<AlertDTO>>(`${this.url}/getAlerts?userId=${+userId}`)
}

}