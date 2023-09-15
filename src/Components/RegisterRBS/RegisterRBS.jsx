import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config'
import { Link } from 'react-router-dom';

const auth = getAuth(app)


const RegisterRBS = () => {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')


    const handleRegister = event =>{
      // 1. prevent page refresh
        event.preventDefault();
        // 2. collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(email, password, name);


        // password validation
        setError('');
        if(password.length < 6){
            setError('Password must be at least 6 characters');
            return;
        }
        else if(!/(?=.*?[A-Z])/.test(password)){
            setError('Password must contain at least one number and one uppercase and lowercase letter');
            return;
        }


        // 3. create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
          const loggedUser = result.user;
          console.log(loggedUser);
          setError('');
          event.target.reset();
          setSuccess('User has been created Successfully.');
          sendVerificationEmail(result.user);
          updateUserData(result.user, name)
        })
        .catch((error) =>{
          console.error(error.message)
          setError(error.message);
        })
    }

    const sendVerificationEmail = (user) =>{
      sendEmailVerification(user)
      .then(result=>{
        console.log(result);
        alert('Please verify your email address')
      })
    }

    const updateUserData = (user, name) =>{
      updateProfile(user, {
        displayName: name
      })
      .then(()=>{
        console.log("user name updated");
      })
      .catch(error =>{
        setError(error.message)
      })
    }


    return (
        <div className='w-50 mx-auto'>
          <h1 className='text-success text-center'>Please Register</h1>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" name='name' placeholder="Your Name" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Accept Terms and Conditions" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
    <p><small>Already have an account? Please <Link to="/login">Login</Link> </small></p>
    </div>
  );
}

export default RegisterRBS;