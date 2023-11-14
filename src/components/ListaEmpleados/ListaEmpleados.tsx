import React, { useState } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  rol: 'Delivery' | 'Cajero' | 'Cocinero';
}

const ListaEmpleados: React.FC = () => {
    const [empleados] = useState<Empleado[]>([
        { id: 1, nombre: 'Juan', apellido: 'Pérez', rol: 'Delivery' },
        { id: 2, nombre: 'Ana', apellido: 'García', rol: 'Cajero' },
        // Agrega más empleados según sea necesario
      ]);
      

  const handleEditar = (id: number) => {
    // Lógica para editar el empleado con el ID proporcionado
    console.log(`Editar empleado con ID: ${id}`);
  };

  const handleEliminar = (id: number) => {
    // Lógica para eliminar el empleado con el ID proporcionado
    console.log(`Eliminar empleado con ID: ${id}`);
  };

  const handleNuevo = () => {
    // Lógica para registrar un nuevo empleado
    console.log('Registrar nuevo empleado');
  };

  return (
    <Container>
      <h1>Empleados</h1>
      <ListGroup>
        {empleados.map((empleado) => (
          <ListGroup.Item key={empleado.id} className="d-flex justify-content-between align-items-center">
            {`${empleado.nombre} ${empleado.apellido} - Rol: ${empleado.rol}`}
            <div>
              <Button variant="primary" onClick={() => handleEditar(empleado.id)}>
                Editar
              </Button>
              <Button variant="danger" className="ms-2" onClick={() => handleEliminar(empleado.id)}>
                Eliminar
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="success" className="mt-3" onClick={handleNuevo}>
        Nuevo
      </Button>
    </Container>
  );
};

export default ListaEmpleados;
