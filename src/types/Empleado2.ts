import { Domicilio } from "./Domicilio"

export interface Empleado2{
   id: number,
   username: string,
   password: string,
   nombre: string,
   apellido: string,
   telefono: string,
   email: string,
   rol: 'DELIVERY' | 'CAJERO' | 'COCINERO',
   domicilio: Domicilio
}