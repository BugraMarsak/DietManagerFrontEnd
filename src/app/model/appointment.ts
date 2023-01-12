export interface Appointment{
    id?:number
    dietianId:number
    clientId:number
    appointmentDate:Date
    appointmentType:string
    fullName?:string
}