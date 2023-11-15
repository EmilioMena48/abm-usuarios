import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {toast} from 'react-toastify';
import { Empleado } from "../../types/Empleado";
import { EmpleadoService } from "../../services/EmpleadoService";

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
    try{
        const isNew = emp.id === 0;
        if(isNew) {
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
        toast.error("ocurrio un error");
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
            //password: Yup.string().required(`Contraseña requerida`),
            password: passwordValidation,
            nombre: Yup.string().required(`Nombre requerido`),
            apellido: Yup.string().required(`Apellido requerido`),
            telefono: Yup.string().required(`Telefono requerido`),
            email: Yup.string().required(`Email requerido`),
            rol: Yup.string().required(`Rol requerido`)  
        });
    };

    const formik = useFormik({
        initialValues: emp,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Empleado) => handleSaveUpdate(obj),
    });

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

                        <Form.Group controlId="formContraseña">
                            <FormLabel>Contraseña</FormLabel>
                            {modalType === ModalType.CREATE ? (
                            <Form.Control
                                name="password"
                                type="text"
                                value={formik.values.password || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.password && formik.touched.password)}
                            />
                            ) : null}
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                   

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
                            <FormLabel>Rol</FormLabel>
                            <Form.Control
                                name="rol"
                                type="text"
                                value={formik.values.rol || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.rol && formik.touched.rol)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.rol}
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
        </>
    )

}

export default EmpleadoModal;