import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// context
import { AuthContext } from '../../../contexts/AuthContext';
// api
import { signIn } from '/src/lib/api/auth';
// component
import SignForm from './SignForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('isSignedIn changed to:', isSignedIn);
    console.log('currentUser changed to:', currentUser);
  }, [isSignedIn, currentUser]);

  const signInHandleSubmit = async (e) => {
    e.preventDefault();

    const params = generateParams();

    try {
      const res = await signIn(params);

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token'], { expires: 7, path: '/', sameSite: 'Lax' });
        Cookies.set('_client', res.headers['client'], { expires: 7, path: '/', sameSite: 'Lax' });
        Cookies.set('_uid', res.headers['uid'], { expires: 7, path: '/', sameSite: 'Lax' });

        console.log('Before setIsSignedIn and setCurrentUser');
        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        console.log('res.data.data:', res.data.data);
        console.log('After setIsSignedIn and setCurrentUser');

        navigate('/dashboard');
        console.log('ログインに成功しました');
      }
    } catch (error) {
      if (error.response) {
        // サーバーがレスポンスを返したが、ステータスコードがエラー
        console.error('Response error:', error.response);
        alert(`Error: ${error.response.data.errors.join(', ')}`);
      } else if (error.request) {
        // リクエストが送信されたが、レスポンスが受信できなかった
        console.error('Request error:', error.request);
        alert('Error: No response from server.');
      } else {
        // その他のエラー
        console.error('Error', error.message);
        alert(`Error: ${error.message}`);
      }
      console.log('ログインに失敗しました');
    }
  };

  const generateParams = () => ({
    // const signInParams = {
    //   email: email,
    //   password: password,
    // };
    // return signInParams;
    email,
    password,
  });

  return (
    <SignForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={signInHandleSubmit}
      signType='signIn'
    />
  );
};

export default LoginPage;
