import React, { useEffect, useState } from 'react';
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

function EditUser() {
  const navigate = useNavigate();
  const [userDetailsValidated, setUserDetailsValidated] = useState(false);
  const [passwordValidated, setPasswordValidated] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',
    firstName: '',
    lastName: '',
    city: '',
    phoneNumber: ''
  });
  const [password, setPassword] = useState('');

  // Check if user is logged in before allowing access to the page
  const isLoggedIn = () => {
    return Boolean(localStorage.getItem('authToken'));
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/NoPage');
    } else {
      // Fetch user details from the server
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get('http://localhost:5000/user-details', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          });
          console.log('Fetched user details:', response.data);

          setUserDetails({
            username: response.data.username,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            city: response.data.city,
            phoneNumber: response.data.phoneNumber
          });
        } catch (error) {
          console.error(error);
          // Handle error, e.g., navigate to login page if the token is invalid
        }
      };
      fetchUserDetails();
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const userData = {
        username: userDetails.username.toLowerCase(),
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        city: userDetails.city,
        phoneNumber: userDetails.phoneNumber
      };

      try {
        const response = await axios.put('http://localhost:5000/update-user', userData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        console.log(response.data);
        navigate('/home');
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }
    setUserDetailsValidated(true);
  };

  const handleSubmitPassword = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const userData = {
        password: password
      };

      try {
        const response = await axios.put('http://localhost:5000/update-password', userData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        console.log(response.data);
        navigate('/home');
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }
    setPasswordValidated(true);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Header />

      <Container>
        <center><h1>Edit Details Page</h1></center>

        <Form noValidate validated={userDetailsValidated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                value={userDetails.firstName}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="lastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                value={userDetails.lastName}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="username">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                  value={userDetails.username}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                required
                value={userDetails.city}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                required
                value={userDetails.phoneNumber}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a Phone Number.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <center><Button type="submit">Change user details</Button></center>
        </Form>
        <br /><br />

        <center>

          <Form noValidate validated={passwordValidated} onSubmit={handleSubmitPassword}>
            <Row className="mb-3">
              <center>
                <Form.Group as={Col} md="4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    required 
                    onChange={handlePasswordChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                </Form.Group>
              </center>
            </Row>

            <center><Button type="submit">Change Password</Button></center>
          </Form>
        </center>
      </Container>
      <Bottom style={{ paddingBottom: '0px' }} />

    </>
  );
}

export default EditUser;
