export interface ClientDietList{
    id:number
    dietitianId?:number
    clientId?:number
    dietInfo?:string
    dietDate?:Date
    note:string
    session:number
    foodNames?:string[]
}