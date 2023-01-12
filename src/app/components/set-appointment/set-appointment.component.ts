import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-appointment',
  templateUrl: './set-appointment.component.html',
  styleUrls: ['./set-appointment.component.scss']
})
export class SetAppointmentComponent implements OnInit {

  date:Date;
  constructor() { }

  ngOnInit(): void {
  }

}
