import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// context
import { AuthContext } from '/src/App';
// api
import { signUp } from '/src/lib/api/auth';
// component
import SignForm from '/src/components/pages/users/SignForm';

const RegisterPage = () => {
  const history = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const signUpHandleSubmit = async (e) => {
    e.preventDefault();

    const params = generateParams();

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history.push('/');
        console.log('signed in successfully');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const generateParams = () => {
    const signUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };
    return signUpParams;
  };

  return (
    <SignForm
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      passwordConfirmation={passwordConfirmation}
      setPasswordConfirmation={setPasswordConfirmation}
      handleSubmit={signUpHandleSubmit}
      signType='signUp'
    />
  );
};

export default RegisterPage;
