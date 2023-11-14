import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

interface Empleado {
  id: number,
  nombre: string;
  apellido: string;
  telefono: string;
  mail: string;
  direccion: string;
  departamento: string;
  contraseña: string;
  fechaNacimiento: string;
  rol: 'Delivery' | 'Cajero' | 'Cocinero';
}

const RegistroEmpleado: React.FC = () => {
  const [empleado, setEmpleado] = useState<Empleado>({
    id: 0,
    nombre: '',
    apellido: '',
    telefono: '',
    mail: '',
    direccion: '',
    departamento: '',
    contraseña: '',
    fechaNacimiento: '',
    rol: 'Delivery',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setEmpleado((prevEmpleado) => ({ ...prevEmpleado, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica de envío del formulario
    console.log('Empleado registrado:', empleado);
  };

  return (
    <Container>
      <h1>Registrar Empleado</h1>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="nombre" value={empleado.nombre} /*onChange={handleChange}*/ />
        </Form.Group>

        <Form.Group className="mb-3" controlId="apellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="text" name="apellido" value={empleado.apellido} /*onChange={handleChange}*/ />
        </Form.Group>

        <Form.Group className="mb-3" controlId="telefono">
          <Form.Label>Telefono</Form.Label>
          <Form.Control type="text" name="telefono" value={empleado.telefono} /*onChange={handleChange}*/ />
        </Form.Group>

        <Form.Group className="mb-3" controlId="mail">
          <Form.Label>Mail</Form.Label>
          <Form.Control type="text" name="mail" value={empleado.mail} /*onChange={handleChange}*/ />
        </Form.Group>

        <Form.Group className="mb-3" controlId="direccion">
          <Form.Label>Dirección</Form.Label>
          <Form.Control type="text" name="direccion" value={empleado.direccion} /*onChange={handleChange}*/ />
        </Form.Group>

        <Form.Group className="mb-3" controlId="departamento">
          <Form.Label>Departamento</Form.Label>
          <Form.Control type="text" name="departamento" value={empleado.departamento} /*onChange={handleChange}*/ />
        </Form.Group>

        <Form.Group className="mb-3" controlId="contraseña">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="text" name="contraseña" value={empleado.contraseña} /*onChange={handleChange}*/ />
        </Form.Group>

        <Form.Group className="mb-3" controlId="fechaNacimiento">
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control type="text" name="fechaNacimiento" value={empleado.fechaNacimiento} /*onChange={handleChange}*/ />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rol">
          <Form.Label>Rol</Form.Label>
          <Form.Select name="rol" value={empleado.rol} onChange={handleChange}>
            <option value="Delivery">Delivery</option>
            <option value="Cajero">Cajero</option>
            <option value="Cocinero">Cocinero</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Confirmar
        </Button>
        <Button variant="secondary" type="button">
          Volver
        </Button>
      </Form>
    </Container>
  );
};

export default RegistroEmpleado;
