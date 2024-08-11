import React, { useCallback } from 'react';
import {  NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../slices/auth';


function LogoutLink(props) {
	const navigate = useNavigate();
	const dispatch  = useDispatch();
	const handleLogout =  useCallback( (event) => {
		event.preventDefault();
		dispatch(logout());
		navigate('/signin');
	},[dispatch,navigate]);

	return (
		<li className='nav-item'>
			<NavLink className='nav-link' to='/signin' onClick={handleLogout} >
				( Logout )
			</NavLink>
		</li>
	);
}

export default LogoutLink;
