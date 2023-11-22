import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {toast} from 'react-toastify';
import { Empleado } from "../../types/Empleado";
import { EmpleadoService } from "../../services/EmpleadoService";
//import { DomicilioService } from "../../services/DomicilioServicio";
//import { Domicilio } from "../../types/Domicilio";
//import { Await } from "react-router-dom";
//import { Domicilio } from "../../types/Domicilio";
//import { DomicilioService } from "../../services/DomicilioServicio";

type EmpleadoModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    emp: Empleado;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmpleadoModal = ({show, onHide, title, modalType, emp, refreshData}: EmpleadoModalProps) => {

    const handleSaveUpdate = async (emp: Empleado) => {
        try {
            
            const isNew = emp.id === 0;
    
            if (isNew) {
                await EmpleadoService.createEmpleado(emp);
            } else {
                await EmpleadoService.updateEmpleado(emp.id, emp);
            }

            toast.success(isNew ? "Empleado Registrado" : "Datos del Empleado Actualizados", {
                position: "top-center",
            });

            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error("Ocurrió un error");
        }
   };
   
   const handleDelete =async () => {

        try {
            await EmpleadoService.deleteEmpleado(emp.id);
            toast.success("Eliminado con exito", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error("ocurrio un error");

        }
   }
 
   
    const validationSchema = () => {

        const passwordValidation = modalType === ModalType.CREATE ? Yup.string().required('Contraseña requerida') : Yup.string();

        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            username: Yup.string().required(`Usuario requerido`),
            password: passwordValidation,
            nombre: Yup.string().required(`Nombre requerido`),
            apellido: Yup.string().required(`Apellido requerido`),
            telefono: Yup.string().required(`Telefono requerido`),
            email: Yup.string().required(`Email requerido`),
            rol: Yup.string().required(`Rol requerido`),
            calle: Yup.string().required('Calle requerida'),
                numero: Yup.number().integer().required('Número requerido'),
                codigoPostal: Yup.number().integer().required('Código Postal requerido'),
                localidad: Yup.string().required('Localidad requerida'),
                departamento: Yup.string().required('Departamento requerido'),
                numeroVivienda: Yup.number().integer().required('Número de vivienda requerido'),
                pisoDto: Yup.string().required('Piso requerido')
        });
    };

    const formik = useFormik({
        initialValues: emp,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Empleado) => handleSaveUpdate(obj),
    });

    //console.log('Debug formik:', formik.errors);

    return(
        <>
         {modalType === ModalType.DELETE? (
            <>
            <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>¿Estás seguro que deseas eliminar el empleado?
                    <br />
                    <strong>{emp.nombre}</strong>
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
            </Modal.Footer>
            </Modal>
            
            </>
         ) : (
            <>
            <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>          
                
                <Form onSubmit={formik.handleSubmit}>

                <Form.Group controlId="formUsuario">
                            <FormLabel>Usuario</FormLabel>
                            <Form.Control
                                name="username"
                                type="text"
                                value={formik.values.username || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.username && formik.touched.username)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                    {modalType === ModalType.CREATE ? (
                        <Form.Group controlId="formContraseña">
                            <FormLabel>Contraseña</FormLabel>
                            <Form.Control
                                name="password"
                                type="text"
                                value={formik.values.password || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.password && formik.touched.password)}
                            />   
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        ) : null}

                        <Form.Group controlId="formNombre">
                            <FormLabel>Nombre</FormLabel>
                            <Form.Control
                                name="nombre"
                                type="text"
                                value={formik.values.nombre || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.nombre}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formApellido">
                            <FormLabel>Apellido</FormLabel>
                            <Form.Control
                                name="apellido"
                                type="text"
                                value={formik.values.apellido || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.apellido && formik.touched.apellido)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.apellido}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formTelefono">
                            <FormLabel>Telefono</FormLabel>
                            <Form.Control
                                name="telefono"
                                type="text"
                                value={formik.values.telefono || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.telefono && formik.touched.telefono)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.telefono}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <FormLabel>Email</FormLabel>
                            <Form.Control
                                name="email"
                                type="text"
                                value={formik.values.email || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.email && formik.touched.email)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formRol">
                            <Form.Label>Rol</Form.Label>
                            <Form.Control
                                as="select"
                                name="rol"
                                value={formik.values.rol || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.rol && formik.touched.rol)}>
                                <option value="">Seleccionar Rol</option>
                                <option value="COCINERO">Cocinero</option>
                                <option value="DELIVERY">Delivery</option>
                                <option value="CAJERO">Cajero</option>
                            </Form.Control>
                        <Form.Control.Feedback type="invalid">
                        {formik.errors.rol}
                        </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group controlId="formCalle">
                            <FormLabel>Calle</FormLabel>
                            <Form.Control
                                name="calle"
                                type="text"
                                value={formik.values.calle || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.calle && formik.touched.calle)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.calle}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formNumero">
                            <FormLabel>Número de Calle</FormLabel>
                            <Form.Control
                                name="numero"
                                type="text"
                                value={formik.values.numero || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.numero && formik.touched.numero)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.numero}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formCPostal">
                            <FormLabel>Código Postal</FormLabel>
                            <Form.Control
                                name="codigoPostal"
                                type="text"
                                value={formik.values.codigoPostal || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.codigoPostal && formik.touched.codigoPostal)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.codigoPostal}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formLocalidad">
                            <FormLabel>Localidad</FormLabel>
                            <Form.Control
                                name="localidad"
                                type="text"
                                value={formik.values.localidad || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.localidad && formik.touched.localidad)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.localidad}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formDepartamento">
                            <FormLabel>Departamento</FormLabel>
                            <Form.Control
                                name="departamento"
                                type="text"
                                value={formik.values.departamento || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.departamento && formik.touched.departamento)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.departamento}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formNvivienda">
                            <FormLabel>Numero de Vivienda</FormLabel>
                            <Form.Control
                                name="numeroVivienda"
                                type="text"
                                value={formik.values.numeroVivienda || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.numeroVivienda && formik.touched.numeroVivienda)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.numeroVivienda}
                            </Form.Control.Feedback>
                        </Form.Group>

                        
                        <Form.Group controlId="formPiso">
                            <FormLabel>Piso</FormLabel>
                            <Form.Control
                                name="pisoDto"
                                type="text"
                                value={formik.values.pisoDto || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.pisoDto && formik.touched.pisoDto)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.pisoDto}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Modal.Footer className="mt-4">
                            <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                            <Button variant="primary" type="submit" disabled={!formik.isValid}>Guardar</Button>
                        </Modal.Footer>

                    </Form>
                </Modal.Body>
            </Modal>
            </>
         )}
        {console.log('formik.values:', formik.values)}
        </>
    )

}

export default EmpleadoModal;