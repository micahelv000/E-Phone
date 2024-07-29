import React from 'react';
import Form from 'react-bootstrap/Form';
import Header from '../../../src/components/Header';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Bottom from '../../../src/components/Bottom';


function Login() {
  const navigate = useNavigate();

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
    }
  };

  return (
    <div>
      <Header />

      <br />

      <Container >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter your username"/>
          </Form.Group>
          <br/>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password"/>
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me"/>
          </Form.Group>

          <div className="mt-3">
            <Link to="/register">Don't have an account? Register here</Link>
          </div>

          <Form.Group controlId="formBasicSubmit">
            <Form.Control type="submit" value="Login" className="btn btn-primary"/>
          </Form.Group>
        </Form>
      </Container>
      <Bottom style={{ paddingBottom: '0px' }} />
      </div>
    
  );
}

export default Login;
