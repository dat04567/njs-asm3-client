import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logout from './LogoutLink';
import LoginLink from './LoginLink';
import Name from './Name';
import classes from './Header.css';
import { useSelector } from 'react-redux';

function Header() {
   const { user: currentUser } = useSelector((state) => state.auth);
   
   return (
      <div className="container px-0 px-lg-3">
         <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
            <Link className="navbar-brand" to={`/`}>
               <span className="font-weight-bold text-uppercase text-dark">Boutique</span>
            </Link>
            <button
               className="navbar-toggler"
               type="button"
               data-toggle="collapse"
               data-target="#navbarNavAltMarkup"
               aria-controls="navbarNavAltMarkup"
               aria-expanded="false"
               aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
               <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                     <NavLink
                        className={(navData) =>
                           navData.isActive ? `nav-link ${classes.active}` : 'nav-link'
                        }
                        to="/">
                        Home
                     </NavLink>
                  </li>

                  <li className="nav-item">
                     <NavLink
                        className={(navData) =>
                           navData.isActive ? `nav-link ${classes.active}` : 'nav-link'
                        }
                        to="/shop">
                        Shop
                     </NavLink>
                  </li>
               </ul>
               <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                     <NavLink  className={(navData) =>
                           navData.isActive ? `nav-link ${classes.active}` : 'nav-link'
                        }
                        to="/cart">
                        <i className="fas fa-dolly-flatbed mr-1 text-gray"></i>
                        Cart
                     </NavLink>
                  </li>
                  {currentUser && <Name name={currentUser.username} />}

                  {currentUser ? <Logout /> : <LoginLink  NavLink={NavLink} classes={classes}/>}
               </ul>
            </div>
         </nav>
      </div>
   );
}

export default Header;
