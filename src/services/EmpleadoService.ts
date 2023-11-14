import { Empleado } from "../types/Empleado";

const BASE_URL = 'http://localhost:8080';

export const EmpleadoService ={

    getEmpleados: async (): Promise<Empleado[]> => {
        const response = await fetch(`http://localhost:8080/api/v1/empleados/buscarEmpleados`);
        const data = await response.json();

        return data;
    },

   /* getProduct: async (id: number): Promise<Product> => {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        const data = await response.json();
        return data;
},*/

    createEmpleado: async (empleado: Empleado): Promise<Empleado> => {
        const response = await fetch(`${BASE_URL}/api/admin/crearEmpleado`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empleado)
        });
        const data = await response.json();
        return data;
},
    updateEmpleado: async (id: number, empleado: Empleado): Promise<Empleado> => {
    const response = await fetch(`${BASE_URL}/api/v1/empleados/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(empleado)
    });
    const data = await response.json();
    return data;

    },

    deleteEmpleado: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/empleados/${id}`, {
            method: "DELETE",
        });
        }
}