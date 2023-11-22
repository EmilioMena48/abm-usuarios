//import { Domicilio } from "./Domicilio"

export interface Empleado{
   id: number,
   username: string,
   password: string,
   nombre: string,
   apellido: string,
   telefono: string,
   email: string,
   rol: 'DELIVERY' | 'CAJERO' | 'COCINERO',
   calle: string,
   numero: number,
   codigoPostal: number,
   localidad: string,
   departamento: string,
   numeroVivienda: number,
   pisoDto: string
   //domicilio: Domicilio
}