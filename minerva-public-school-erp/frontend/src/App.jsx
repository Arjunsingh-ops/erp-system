import React, { useEffect, useState } from 'react';
import LoginPage from './pages/Login.jsx';
import StudentsPage from './pages/Students.jsx';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  if (!token) {
    return <LoginPage onLogin={setToken} />;
  }
  return <StudentsPage token={token} onLogout={() => setToken(null)} />;
}