import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Empleado } from '../../types/Empleado';
import { ModalType } from '../../types/ModalType';
import { EmpleadoService } from '../../services/EmpleadoService';
import Loader from "../Loader/Loader";
import EmpleadoModal from '../EmpleadoModal/EmpleadoModal';
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { Empleado2 } from '../../types/Empleado2';



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
        rol: 'COCINERO',
        calle: "",
        numero: 0,
        codigoPostal: 0,
        localidad: "",
        departamento: "",
        numeroVivienda: 0,
        pisoDto: ""
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

  

  const [empleados, setEmpleados] = useState<Empleado2[]>([]);

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


  const convertirEmpleado2AEmpleado = (empleado2: Empleado2): Empleado => {
    //const { domicilio, ...restoEmpleado2 } = empleado2;
    return {
      id: empleado2.id,
      username: empleado2.username,
        password: empleado2.password,
        nombre: empleado2.nombre,
        apellido: empleado2.apellido,
        telefono: empleado2.telefono,
        email: empleado2.email,
        rol: empleado2.rol,
      calle: empleado2.domicilio.calle,
      numero: empleado2.domicilio.numero,
      codigoPostal: empleado2.domicilio.codigoPostal,
      localidad: empleado2.domicilio.localidad,
      departamento: empleado2.domicilio.departamento,
      numeroVivienda: empleado2.domicilio.numeroVivienda,
      pisoDto: empleado2.domicilio.pisoDto,
    };
  };

  return(
    <>
      <Button style={{ marginBottom: '1em'}} onClick={() => handleClick("Nuevo empleado", initializableNewEmpleado(),
      ModalType.CREATE)}>Nuevo</Button>

      {istloading? <Loader/>: (
        
          <Table hover style={{ textAlign: 'center'}}>
              <thead>
                  <tr>     
                      <th> Usuario </th>
                      <th> Nombre </th>
                      <th> Apellido </th>
                      <th> Telefono </th>
                      <th> Email </th>
                      <th> Rol </th>
                      <th> Calle </th>
                      <th> Número </th>
                      <th> C.Postal </th>
                      <th> Localidad </th>
                      <th> Departamento </th>
                      <th> N°Vivienda </th>
                      <th> Piso </th>
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
                          <td>{empleado.domicilio.calle}</td>
                          <td>{empleado.domicilio.numero}</td>
                          <td>{empleado.domicilio.codigoPostal}</td>
                          <td>{empleado.domicilio.localidad}</td>
                          <td>{empleado.domicilio.departamento}</td>
                          <td>{empleado.domicilio.numeroVivienda}</td>
                          <td>{empleado.domicilio.pisoDto}</td>
                          
                       
                          <td><EditButton onClick={() => handleClick("Editar Empleado", convertirEmpleado2AEmpleado(empleado), ModalType.UPDATE)}/></td>
                          <td><DeleteButton onClick={() => handleClick("Borrar Empleado", convertirEmpleado2AEmpleado(empleado), ModalType.DELETE)}/></td>
                         

                          
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


 //  <td>{empleado.domicilio.calle}</td>

                    /*    <td><EditButton onClick={() => handleClick("Editar Empleado", convertirEmpleado2AEmpleado(empleado), ModalType.UPDATE)}/></td>
                          <td><DeleteButton onClick={() => handleClick("Borrar Empleado", convertirEmpleado2AEmpleado(empleado), ModalType.DELETE)}/></td>
                           <td><EditButton onClick={() => handleClick("Editar Empleado", empleado, ModalType.UPDATE)}/></td>
                          <td><DeleteButton onClick={() => handleClick("Borrar Empleado", empleado, ModalType.DELETE)}/></td>
                           <td><EditButton onClick={() => console.log(empleado)}/></td>
                          */