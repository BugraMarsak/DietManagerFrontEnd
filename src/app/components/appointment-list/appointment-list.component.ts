import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientListDTO } from './../../model/clientListDTO';
import { DietianClientListService } from './../../services/dietian-client-list.service';
import { Appointment } from './../../model/appointment';
import { TokenClaim } from './../../services/tokenclaim.service';
import { AppointmentService } from './../../services/Appointment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  constructor(private appointmentService:AppointmentService,private tokenClaim :TokenClaim,private dietianClientListService:DietianClientListService,
    private snackBar: MatSnackBar
    ) { }
  Appointments:Appointment[][]=[]
  ClientLists:ClientListDTO[]=[]
  ngOnInit(): void {
    this.getTodayAppointments()
    this.getClients(this.tokenClaim.getid());
  }
  hours:number[]=[9,10,11,12,13,14,15,16,17]
  selectedDate:Date =new Date()
  getTodayAppointments(){
    this.Appointments =[]
    this.appointmentService.getTodayAppointments(
      this.tokenClaim.getid(),
      this.selectedDate.getDate(),
      this.selectedDate.getMonth()+1,
      this.selectedDate.getFullYear()).subscribe(res=>{
        console.log(res);
        this.hours.forEach(element => {
          let start = new Date(this.selectedDate)
          let end = new Date(this.selectedDate)
          start.setHours(element)
          start.setMinutes(0)
          start.setSeconds(0)
          end.setHours(element)
          end.setMinutes(59)
          end.setSeconds(59)
          console.log(start);
          
          let tempd = res.data.filter(x=>new Date(x.appointmentDate)>=start && new Date(x.appointmentDate)<=end)
          this.Appointments.push(tempd)

        });
        this.snackBar.open('Appointments Listed', 'Close', {
          duration: 5000
        });
    },reserror=>{
      this.snackBar.open('a problem has occurred', 'Close', {
        duration: 5000
      });
    })
  }
  checkLength(array:Appointment[]){
    return array.length==0;
  }

  getClients(Id:number){
    this.dietianClientListService.getByDietianId(Id).subscribe(res=>{
      this.ClientLists = res.data;
      console.log(res);
      
    })
}

}
