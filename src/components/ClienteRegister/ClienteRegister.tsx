import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Cliente } from '../../types/Cliente';

type ClienteSectionProps = {
  cli: Cliente;
  refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const ClienteSection = ({ cli, refreshData }: ClienteSectionProps) => {
  const handleSaveUpdate = async (cli: Cliente) => {
    try {
      const isNew = cli.id === 0;
      if (isNew) {
        // Call your service functions for creating a new client
      } else {
        // Call your service functions for updating an existing client
      }
      toast.success(isNew ? 'Cliente Registrado' : 'Datos del Cliente Actualizados', {
        position: 'top-center',
      });
      refreshData((prevState) => !prevState);
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error');
    }
  };

  const validationSchema = () => {
    return Yup.object().shape({
      id: Yup.number().integer().min(0),
      username: Yup.string().required('Usuario requerido'),
      password: Yup.string().required('Contraseña requerida'),
      nombre: Yup.string().required('Nombre requerido'),
      apellido: Yup.string().required('Apellido requerido'),
      telefono: Yup.string().required('Telefono requerido'),
      email: Yup.string().required('Email requerido').email('Email no válido'),
    });
  };

  const formik = useFormik({
    initialValues: cli,
    validationSchema: validationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (obj: Cliente) => handleSaveUpdate(obj),
  });

  return (
    <div>
      <h2>Registro de Cliente</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            name="nombre"
            type="text"
            value={formik.values.nombre || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.nombre}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formApellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            name="apellido"
            type="text"
            value={formik.values.apellido || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={Boolean(formik.errors.apellido && formik.touched.apellido)}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.apellido}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formUsuario">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            name="username"
            type="text"
            value={formik.values.username || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={Boolean(formik.errors.username && formik.touched.username)}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formContraseña">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={formik.values.password || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={Boolean(formik.errors.password && formik.touched.password)}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formTelefono">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            name="telefono"
            type="text"
            value={formik.values.telefono || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={Boolean(formik.errors.telefono && formik.touched.telefono)}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.telefono}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="text"
            value={formik.values.email || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={Boolean(formik.errors.email && formik.touched.email)}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!formik.isValid}>
          Registrar
        </Button>
      </Form>
    </div>
  );
};

export default ClienteSection;
