import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Sign_in.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', formData);
      setSuccessMessage(response.data.message);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="login-page">
       
      <div className="login-container">
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

       
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="secondary" type="submit">
            Log In
          </Button>
        </Form>
      </div>

      <div className="image-section">
        <div className="welcome-text">Welcome back!</div>
        <img
          src="https://png.pngtree.com/png-vector/20220717/ourmid/pngtree-vector-flat-illustration-of-business-person-sitting-at-table-in-office-png-image_5982805.png"
          alt="Background"
          className="image-section-img"
        />
      </div>
    </div>
  );
};

export default SignIn;
