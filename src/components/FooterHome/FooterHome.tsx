//import Nav from 'react-bootstrap/Nav';
import './FooterHome.css';

const FooterHome = () => {

    return(
        <>
         <footer>
        <nav className="navbar navbar-light ">
            <div className="container-fluid">
              <span className="navbar-text">
                Copyright © 2023 El buen sabor | All Rights Reserved
              </span>
              <ul className="nav justify-content-end">
                <li className="nav-item">
                    <a className="nav-link red-social whatsapp" href="#">
                        <i className="uil uil-whatsapp-alt wh"></i>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link red-social instagram" href="#">
                        <i className="uil uil-instagram ig"></i>
                    </a>            
                </li>
              </ul>
            </div>
          </nav>
          
    </footer>
        </>
    )

}

export default FooterHome;