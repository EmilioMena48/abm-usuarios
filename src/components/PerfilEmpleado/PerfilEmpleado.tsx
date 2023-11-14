// EmployeeProfile.tsx
import React, { useEffect, useState } from 'react';
import { EmpleadoService } from '../../services/EmpleadoService';
import { Empleado } from '../../types/Empleado';
import jwt from 'jsonwebtoken';

const PerfilEmpleado: React.FC = () => {
  const [datosEmpleado, setdatosEmpleado] = useState<Empleado | null>(null);
  const [loading, setLoading] = useState(true);

  //const jwt = require('jsonwebtoken');
  const token = window.localStorage.getItem('token');
  if(token !== null) {
   const a =  jwt.decode(token);
   console.log(a);
  }
  
  
    // Almacenar el ID del usuario en algún lugar (por ejemplo, en el estado de tu aplicación)
    console.log('ID del usuario:', userId);
  } catch (error) {
    console.error('Error al verificar el token:', error.message);
  }

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const data = await EmpleadoService.getEmpleado();
        setEmployeeData(data);
        setLoading(false);
      } catch (error) {
        // Manejar errores si es necesario
        console.error('Error al obtener los datos del empleado:', error.message);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <div>
      <h2>Perfil del empleado</h2>
      {loading ? (
        <p>Cargando datos...</p>
      ) : employeeData ? (
        <div>
          <p>Id: {employeeData.id}</p>
          <p>Usuario: {employeeData.username}</p>
          <p>Contraseña: {employeeData.password}</p>
          <p>Nombre: {employeeData.nombre}</p>
          <p>Apellido: {employeeData.apellido}</p>
          <p>Telefono: {employeeData.telefono}</p>
          <p>Email: {employeeData.email}</p>
          <p>Rol: {employeeData.rol}</p>
          {/* Puedes agregar más campos según la estructura de tus datos de empleado }
        </div>
      ) : (
        <p>No se encontraron datos del empleado.</p>
      )}
    </div>
  );
};

export default PerfilEmpleado;
