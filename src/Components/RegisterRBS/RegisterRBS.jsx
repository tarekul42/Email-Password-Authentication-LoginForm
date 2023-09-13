import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../firebase/firebase.config'

const RegisterRBS = () => {

  const auth = getAuth(app)

    const handleRegister = event =>{
      // 1. prevent page refresh
        event.preventDefault();
        // 2. collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        // 3. create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
          const loggedUser = result.user;
          console.log(loggedUser);
        })
        .catch((error) =>{
          console.error(error)
        })
    }


    return (
        <div className='w-50 mx-auto'>
    <Form onSubmit={handleRegister}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Accept Terms and Conditions" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default RegisterRBS;