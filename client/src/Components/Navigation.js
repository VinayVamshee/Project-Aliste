import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('loggedInUser');
        if (savedUser) setLoggedInUser(savedUser);
    }, []);

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(
            u => u.username === loginUsername && u.password === loginPassword
        );
        if (user) {
            localStorage.setItem('loggedInUser', user.username);
            setLoggedInUser(user.username);
            setLoginUsername('');
            setLoginPassword('');
            window.location.reload(); // Refresh to reflect UI change
        } else {
            alert('Invalid credentials.');
        }
    };

    const handleRegister = () => {
        if (!registerUsername.trim() || !registerPassword.trim()) return alert("Fill both fields");
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(u => u.username === registerUsername);
        if (existingUser) {
            alert('Username already taken.');
        } else {
            users.push({ username: registerUsername, password: registerPassword });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registered! Please login.');
            setRegisterUsername('');
            setRegisterPassword('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        window.location.reload(); // optional
    };

    return (
        <div>
            <div className='navbar'>
                <div className='logo-name'>Aliste</div>
                <div className='navbar-buttons'>
                    <Link to="/" className='navbar-button btn btn-sm'>Home</Link>
                    <Link to="/" className='navbar-button btn btn-sm'>Products</Link>
                    <Link to="/cart" className='navbar-button btn btn-sm'>Cart</Link>

                    {loggedInUser ? (
                        <>
                            <span className="mx-2" style={{color:'white'}}>Hello, {loggedInUser}</span>
                            <button className="btn btn-sm btn-warning" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <button className="btn btn-danger btn-sm" data-bs-target="#loginModal" data-bs-toggle="modal">Login</button>
                    )}
                </div>
            </div>

            {/* Login Modal */}
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true" aria-labelledby="loginModalLabel" data-bs-backdrop="false">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="loginModalLabel">Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control mb-2" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
                            <input type="password" className="form-control mb-2" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-sm btn-success" onClick={handleLogin}>Login</button>
                            <button className="btn btn-sm btn-secondary" data-bs-target="#registerModal" data-bs-toggle="modal" data-bs-dismiss="modal">New user? Register</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Register Modal */}
            <div className="modal fade" id="registerModal" tabIndex="-1" aria-hidden="true" aria-labelledby="registerModalLabel">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="registerModalLabel">Register</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control mb-2" placeholder="New Username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
                            <input type="password" className="form-control mb-2" placeholder="New Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-sm btn-primary" onClick={handleRegister}>Register</button>
                            <button className="btn btn-sm btn-secondary" data-bs-target="#loginModal" data-bs-toggle="modal" data-bs-dismiss="modal">Back to Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
