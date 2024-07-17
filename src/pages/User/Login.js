import React from 'react';
import Form from 'react-bootstrap/Form';
import Header from '../../../src/components/Header';
import { Container } from 'react-bootstrap';

function Login() {
  return (
    <div>
      <Header />

      <br />

      <Container>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter your username" />
          </Form.Group>
          <br />

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Form.Group controlId="formBasicSubmit">
            <Form.Control type="submit" value="Login" className="btn btn-primary" />
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
