// EmpleadoDetalle.tsx
import React, { useState, useEffect } from 'react';
import { EmpleadoService } from '../services/EmpleadoService';
import { Empleado } from '../types/Empleado';
import  { JwtPayload, jwtDecode } from 'jwt-decode';
import EditButton from '../components/EditButton/EditButton';
import { ModalType } from '../types/ModalType';
import EmpleadoModal from '../components/EmpleadoModal/EmpleadoModal';
import Loader from '../components/Loader/Loader';

interface EmpleadoDetalleProps {
  // No es necesario pasar el ID como prop, ya que se obtendrá internamente
}

interface MyJwtPayload extends JwtPayload {
    id: string; // Ajusta el tipo según la estructura real del ID en tu token
  }

  const init = (): Empleado => {
    return {
      id: 0,
      username: "",
      password: "",
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      rol: 'COCINERO',
      calle: "",
      numero: 0,
      codigoPostal: 0,
      localiadad: "",
      departamento: "",
      numeroVivienda: 0,
      pisoDto: ""
    };
};

const EmpleadoDetalle: React.FC<EmpleadoDetalleProps> = () => {
  const [empleado, setEmpleado] = useState<Empleado>(init);

  const [showModal, setShowModal] = useState(false);
  
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  
  const [title, setTitle] = useState("");

  const [istloading, setLoading] = useState(true);

  const [refreshData, setRefreshData] = useState(false);
  
  const handleClick = (newTitle: string, emp: Empleado, modal: ModalType) => {
      setTitle(newTitle);
      setModalType(modal);
      setEmpleado(emp);
      setShowModal(true);
  };

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        // Extraer el token de local storage
        const token = localStorage.getItem('jwtToken'); // Asegúrate de ajustar el nombre de tu token

        if (token) {
          // Decodificar el token para obtener el userId
          const decodedToken: MyJwtPayload = jwtDecode(token);
          console.log(decodedToken);
          const userId = decodedToken.id;
            
          // Llamar a getEmpleado con el userId
          const data: Empleado = await EmpleadoService.getEmpleado(parseInt(userId, 10));
          setEmpleado(data);
          setLoading(false);
        } else {
          console.error('Token no encontrado en el almacenamiento local');
          const token = localStorage.getItem('tuNombreDeToken'); 
         /* const decodedToken: MyJwtPayload = jwtDecode(token);*/
          console.log(token);
        }
      } catch (error) {
        console.error('Error al obtener los datos del empleado', error);
        const token = localStorage.getItem('jwtToken'); 
        /* const decodedToken: MyJwtPayload = jwtDecode(token);*/
         console.log(token);
      }
    };

    fetchEmpleado();
  }, [refreshData]);


  return (
    <>
      {istloading ? (
        <Loader />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <h2>Mis Datos</h2>
          <div style={{ display: 'flex', gap: '20px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                <label>Nombre:</label>
                <input type="text" value={empleado?.nombre} readOnly style={{ borderRadius: '8px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label>Apellido:</label>
              <input type="text" value={empleado?.apellido} readOnly style={{ borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label>Username:</label>
              <input type="text" value={empleado?.username} readOnly style={{ borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label>Password:</label>
              <input type="password" value={empleado?.password} readOnly style={{ borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label>Teléfono:</label>
              <input type="text" value={empleado?.telefono} readOnly style={{ borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label>Email:</label>
              <input type="text" value={empleado?.email} readOnly style={{ borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label>Rol:</label>
              <input type="text" value={empleado?.rol} readOnly style={{ borderRadius: '8px' }} />
            </div>
            </div>
  
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                <label>Calle:</label>
                <input type="text" value={empleado?.calle} readOnly style={{ borderRadius: '8px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label>Número de Calle:</label>
              <input type="text" value={empleado?.numero} readOnly style={{ borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label>Código Postal:</label>
              <input type="text" value={empleado?.codigoPostal} readOnly style={{ borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label>Localidad:</label>
              <input type="text" value={empleado?.localiadad} readOnly style={{ borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label>Departamento:</label>
              <input type="text" value={empleado?.departamento} readOnly style={{ borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label>Número de Vivienda:</label>
              <input type="text" value={empleado?.numeroVivienda} readOnly style={{ borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
              <label>Piso:</label>
              <input type="text" value={empleado?.pisoDto} readOnly style={{ borderRadius: '8px' }} />
            </div>   
            </div>
          </div>
        </div>
      )}

      <EditButton onClick={() => handleClick("Editar Empleado", empleado, ModalType.UPDATE)}/>
      
      {showModal && (
                <EmpleadoModal
                show={showModal}
                onHide={() => setShowModal(false)}
                title={title}
                modalType={modalType}
                emp={empleado}
                refreshData={setRefreshData}
                />
            )}  
    </>
  );
  
  }

export default EmpleadoDetalle;
