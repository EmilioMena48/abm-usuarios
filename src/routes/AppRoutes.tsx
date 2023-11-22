import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegistrarEmpleado from "../pages/RegistrarEmpleado";
import Empleados from "../pages/Empleados";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import Perfil from "../pages/Perfil";

const AppRoutes: React.FC = () => {

    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/Empleados" element={<PrivateRoute element={<Empleados />} />}/>
            <Route path="/RegistrarEmpleado" element={<PrivateRoute element={<RegistrarEmpleado />} />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/Perfil" element={<PrivateRoute element={<Perfil />} />}/>
        </Routes>
    )

}

export default AppRoutes;