import React from 'react';
import './navbar.css';
import { useNavigate } from 'react-router';

function Navbar(props) {
    let navigate = useNavigate();

    function logoutClick() {
        sessionStorage.clear();
        navigate('/');
    }

    return (
        <>
            <nav className="navbar shadow navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    <span className="navbar-brand" style={{ letterSpacing: '3px', display: 'flex', alignItems: 'center' }}>
                        <img src="https://i.pinimg.com/736x/82/be/d4/82bed479344270067e3d2171379949b3.jpg" alt="Food Logo" width="40" height="40" className="d-inline-block align-top me-2" />
                        KITCHEN RECIPE 
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {props.home ? (
                                <li className="nav-item">
                                    <span className="nav-link active" aria-current="page" onClick={() => navigate('/home')}>Home</span>
                                </li>
                            ) : null}
                            {props.myProfile ? (
                                <li className="nav-item">
                                    <span className="nav-link active" aria-current="page" onClick={() => navigate('/profile')}>My Profile</span>
                                </li>
                            ) : null}
                            {props.logout ? (
                                <li className="nav-item">
                                    <span className="nav-link active" aria-current="page" onClick={() => logoutClick()}>Logout</span>
                                </li>
                            ) : null}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
