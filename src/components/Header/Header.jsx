import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Header = () => {

    const { user, logOut } = useContext(AuthContext) 
    
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    return (
        <div className="navbar bg-white">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to="/">Home</Link></li>
                </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">QuoraClone</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
            {
                user?.uid ?
                    <div className="navbar-end hidden mg:flex lg:flex items-center">
                        <div className="avatar mr-2">
                            <div className="w-12 rounded-full">
                                <img src={user.photoURL} />
                            </div>
                        </div>
                        <p className='font-bold mr-2'>{user?.displayName}</p>
                        <button onClick={handleLogOut} className="btn btn-primary mr-2">Logout</button>
                    </div>
                    :
                    <div className="navbar-end hidden md:flex lg:flex">
                        <Link to='/login' className="btn btn-primary mr-2">Login</Link>
                        <Link to='/register' className="btn btn-primary">Register</Link>
                    </div>

            }
            </div>
        </div>
    );
};

export default Header;