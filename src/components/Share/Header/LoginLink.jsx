import React  from 'react';
import { NavLink } from 'react-router-dom';

function LoginLink({ classes }) {
   return (
      <li className="nav-item">
         <NavLink
            className={({ isActive }) => {
              return  isActive ? `nav-link ${classes.active}` : 'nav-link';
            }}
            to="/signin">
            <i className="fas fa-user-alt mr-1 text-gray"></i>Login
         </NavLink>
      </li>
   );
}

export default LoginLink;
