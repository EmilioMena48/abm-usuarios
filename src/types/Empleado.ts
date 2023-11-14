export interface Empleado{
   id: number,
   username: string,
   password: string,
   nombre: string,
   apellido: string,
   telefono: string,
   email: string,
   rol: 'DELIVERY' | 'CAJERO' | 'COCINERO'
}