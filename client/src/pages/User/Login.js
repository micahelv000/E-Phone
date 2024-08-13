import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Header from '../../components/layout/Header';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Bottom from '../../components/layout/Bottom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.formBasicUsername.value;
    const password = event.target.formBasicPassword.value;

    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      console.log(response.data);
      localStorage.setItem('authToken', response.data.token);
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
      <div className="login-page">
        <Header />

        <Container className="login-container">
          <Card className="login-card">
            <Card.Body>
              <Card.Title className="text-center login-card-title">Login</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter your username" />
                </Form.Group>
                <br />

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="login-password-wrapper">
                    <Form.Control
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="btn btn-outline-secondary login-password-toggle"
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </Form.Group>
                <br />

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>

                {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}

                <Button variant="primary" type="submit" className="w-100 mt-3 login-btn-primary">
                  Login
                </Button>

                <div className="mt-3 text-center">
                  <Link to="/register">Don't have an account? Register here</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
        <Bottom style={{ paddingBottom: '0px' }} />
      </div>
  );
}

export default Login;