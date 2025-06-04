import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';


const Callback = () => {
  const { saveAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(search).get('code');
    if (!code) return;

    fetch('/.netlify/functions/token', {
      method: 'POST',
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        saveAuth(data);
        navigate('/swipe');
      });
  }, [search, navigate, saveAuth]);

  return <div className="text-white p-10">Authorizing...</div>;
};

export default Callback;
