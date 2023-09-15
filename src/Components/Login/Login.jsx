import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from 'firebase/auth';
import app from '../../firebase/firebase.config'
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();


    const handleLogin = event =>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

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

        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            if(!loggedUser.emailVerified){

            }
            setSuccess('User Login Successful.');
            setError('');
        })
        .catch(error =>{
            setError(error.message);
        })


    }

    const handleResetPassword = event =>{
        const email = emailRef.current.value;
        if(!email){
            alert('Please Provide your email address to reset password')
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert('Please check your email')
        })
        .catch(error =>{
            console.log(error);
            setError(error.message)
        })
    }


    return (
        <div className='w-25 mx-auto'>
            <h1 className='text-success text-center'>Please Login</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" ref={emailRef} name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accept Terms and Conditions" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>
            <p><small>New to this website? Please <Link to="/registerRBS">Register</Link> </small></p>
        </div>
    );
};

export default Login;