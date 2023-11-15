import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Empleado } from '../../types/Empleado';
import { ModalType } from '../../types/ModalType';
import { EmpleadoService } from '../../services/EmpleadoService';
import Loader from "../Loader/Loader";
import EmpleadoModal from '../EmpleadoModal/EmpleadoModal';
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";



const ListaEmpleados1 = () => {

  const initializableNewEmpleado = (): Empleado => {
      return {
        id: 0,
        username: "",
        password: "",
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        rol: 'COCINERO'
      };
  };

  const [empleado, setEmpleado] = useState<Empleado>(initializableNewEmpleado);

  const [showModal, setShowModal] = useState(false);
  
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  
  const [title, setTitle] = useState("");
  
  const handleClick = (newTitle: string, emp: Empleado, modal: ModalType) => {
      setTitle(newTitle);
      setModalType(modal);
      setEmpleado(emp);
      setShowModal(true);
  };

  

  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  const [istloading, setLoading] = useState(true);

  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
      const fetchProducts = async () =>{
          const empleados = await EmpleadoService.getEmpleados();
          setEmpleados(empleados);
          setLoading(false);
      };

      fetchProducts();
  }, [refreshData]);

  console.log(JSON.stringify(empleados, null, 2));
  
  return(
    <>
      <Button onClick={() => handleClick("Nuevo empleado", initializableNewEmpleado(),
      ModalType.CREATE)}>Nuevo</Button>

      {istloading? <Loader/>: (
          <Table hover>
              <thead>
                  <tr>
                      
                      <th> Usuario </th>
                     
                      <th> Nombre </th>
                      <th> Apellido </th>
                      <th> Telefono </th>
                      <th> Email </th>
                      <th> Rol </th>
                  </tr>
              </thead>
              <tbody>
                  {empleados.map( empleado => (
                      <tr key={empleado.id}>
                          <td>{empleado.username}</td>
                        
                          <td>{empleado.nombre}</td>
                          <td>{empleado.apellido}</td>
                          <td>{empleado.telefono}</td>
                          <td>{empleado.email}</td>
                          <td>{empleado.rol}</td>
                          <td><EditButton onClick={() => handleClick("Editar Empleado", empleado, ModalType.UPDATE)}/></td>
                            <td><DeleteButton onClick={() => handleClick("Borrar Empleado", empleado, ModalType.DELETE)}/></td>
                      </tr>
                  ))}
              </tbody>
              
          </Table>
      )}

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
  )
}

export default ListaEmpleados1;
