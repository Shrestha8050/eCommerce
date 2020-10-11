import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, logout } from '../Helper/auth';

const Header = ({ history }) => {
  const handleLogout = (evt) => {
    logout(() => {
      history.push('/login');
    });
  };
  const showNav = () => (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link to='/' className='navbar-brand'>
        LOGO
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarTogglerDemo02'
        aria-controls='navbarTogglerDemo02'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
        <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
          {isAuthenticated() ? (
            <li className='nav-item my-auto  '>
              <Link to='/user' className='nav-link'>
                Welcome {isAuthenticated().username}
              </Link>
            </li>
          ) : null}

          {!isAuthenticated() && (
            <>
              <li className='nav-item '>
                <Link to='/login' className='nav-link'>
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/signup' className='nav-link'>
                  Sign Up
                </Link>
              </li>
            </>
          )}
          {isAuthenticated() && isAuthenticated().role === 0 && (
            <>
              <li className='nav-item '>
                <Link to='/user/dashboard' className='nav-link'>
                  Dashboard
                </Link>
              </li>
            </>
          )}
          {isAuthenticated() && isAuthenticated().role === 1 && (
            <>
              <li className='nav-item '>
                <Link to='/admin/dashboard' className='nav-link'>
                  Dashboard
                </Link>
              </li>
            </>
          )}
          {isAuthenticated() && (
            <li className='nav-item '>
              <button className='nav-link btn ' onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
  return <div className='header'>{showNav()}</div>;
};

export default withRouter(Header);
