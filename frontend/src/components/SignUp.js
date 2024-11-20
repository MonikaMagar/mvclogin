import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import './Sign_up.css';  // Ensure correct path to your CSS file
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const Navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:4000/api/v1/register', formData);
      setSuccessMessage(response.data.message);

      // Close the modal after successful signup
      setTimeout(() => {
       Navigate("/login");
      }, 1000); // Delay 2 seconds to show success message before redirecting
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="signup-page">
      {/* Heading Section */}
      <h1 className="signup-heading">Create an account</h1>

      {/* Form and Image Section */}
      <div className="signup-content">
        <div className="signup-container">
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label className="form-label">Username : </Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="form-label">Email address : </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="form-label">Password : </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>

        {/* Image Section */}
        <div className="image-section">
          <div className="welcome-text">Hello, friends!</div>
          <img 
            src="https://th.bing.com/th/id/OIP.ttPtyOoixu994kOPGDxdOQHaHa?pid=ImgDet&w=174&h=174&c=7&dpr=1.3" 
            alt="Signup" 
            className="image-section-img" 
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
