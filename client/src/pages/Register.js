import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/register', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Register</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2 mb-2 w-full" />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} className="border p-2 mb-2 w-full" />
      <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2">Register</button>
    </div>
  );
}