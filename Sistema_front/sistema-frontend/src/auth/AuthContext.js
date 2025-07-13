import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  const loginUsuario = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('loginTime', Date.now().toString());
    setToken(token);
    setRole(role);
  };

  const logoutUsuario = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('loginTime');
    setToken(null);
    setRole(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const loginTime = localStorage.getItem('loginTime');
      if (token && loginTime) {
        const diff = Date.now() - parseInt(loginTime, 10);
        if (diff > 15 * 60 * 1000) {
          alert('Sessão expirada. Faça login novamente.');
          logoutUsuario();
          window.location.href = '/login';
        }
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, role, loginUsuario, logoutUsuario, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
