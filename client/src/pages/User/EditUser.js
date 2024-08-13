import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Header from '../../components/layout/Header';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Bottom from '../../components/layout/Bottom';
import { FaUser, FaCity, FaPhone, FaImage, FaLock } from 'react-icons/fa';
import './EditUser.css';

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
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const isLoggedIn = () => {
    return Boolean(localStorage.getItem('authToken'));
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/NoPage');
    } else {
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

          setProfilePictureUrl(`http://localhost:5000/user-profile-picture/${response.data._id}?cb=${new Date().getTime()}`);
        } catch (error) {
          console.error(error);
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
      const userData = new FormData();
      userData.append('username', userDetails.username.toLowerCase());
      userData.append('firstName', userDetails.firstName);
      userData.append('lastName', userDetails.lastName);
      userData.append('city', userDetails.city);
      userData.append('phoneNumber', userDetails.phoneNumber);
      if (profilePicture) {
        userData.append('profilePicture', profilePicture);
      }

      try {
        const response = await axios.put('http://localhost:5000/update-user', userData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        navigate('/home');
      } catch (error) {
        console.error(error);
      }
    }
    setUserDetailsValidated(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
    setProfilePictureUrl(URL.createObjectURL(file));
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
    <div className="edit-user-page">
      <Header />
      <Container className="edit-user-container">
        <center><h1>Edit Details Page</h1></center>

        <Form noValidate validated={userDetailsValidated} onSubmit={handleSubmit} className="edit-user-form">
          <Row className="mb-3 justify-content-center">
            <Form.Group as={Col} md="6" controlId="profilePicture" className="text-center">
              <FaImage className="form-icon" />
              <Form.Label>Profile Picture</Form.Label>
              {profilePictureUrl && (
                <div className="profile-picture-preview">
                  <img src={profilePictureUrl} alt="Profile Preview" className="profile-picture-img" />
                </div>
              )}
              <Form.Control
                type="file"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="firstName">
              <FaUser className="form-icon" />
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
              <FaUser className="form-icon" />
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
              <FaUser className="form-icon" />
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
              <FaCity className="form-icon" />
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
              <FaPhone className="form-icon" />
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
          <center><Button type="submit" className="btn btn-primary">Change user details</Button></center>
        </Form>
        <br /><br />

        <center>
          <Form noValidate validated={passwordValidated} onSubmit={handleSubmitPassword} className="edit-user-form">
            <Row className="mb-3">
              <center>
                <Form.Group as={Col} md="4" controlId="password">
                  <FaLock className="form-icon" />
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

            <center><Button type="submit" className="btn btn-primary">Change Password</Button></center>
          </Form>
        </center>
      </Container>
      <Bottom style={{ paddingBottom: '0px' }} />
    </div>
  );
}

export default EditUser;