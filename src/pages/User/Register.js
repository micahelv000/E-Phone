import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Header from '../../../src/components/Header';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Bottom from '../../components/Bottom';



function Register() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Prepare data from form fields
      const userData = {
        username: document.getElementById('validationCustomUsername').value.toLowerCase(),
        password: document.getElementById('validationCustom04').value,
        firstName: document.getElementById('validationCustom01').value,
        lastName: document.getElementById('validationCustom02').value,
        city: document.getElementById('validationCustom03').value,
        phoneNumber: document.getElementById('validationCustom05').value,
      };

      try {
        const response = await axios.post('http://localhost:5000/register', userData);
        console.log(response.data);
        localStorage.setItem('authToken', response.data.token);
        navigate('/');
        // Redirect or show success message
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }

    setValidated(true);
  };

  return (
    <>
    <Header />

    <Container>
    <center><h1>Register page</h1></center>
 
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Password</Form.Label>
          <Form.Control type="Password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Phone Number" required />
          <Form.Control.Feedback type="invalid">
            Please provide a Phone Number.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <center><Button type="submit">Submit form</Button></center>
    </Form>
    </Container>
    <Bottom style={{ paddingBottom: '0px' }} />

    </>
  );
}

export default Register;