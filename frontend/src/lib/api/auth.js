import client from './apiClient';
import Cookies from 'js-cookie';

export const signUp = (params) => {
  return client.post('/auth', params);
};

export const signIn = (params) => {
  return client.post('/auth/sign_in', params);
};

export const signOut = () => {
  const accessToken = Cookies.get('_access_token');
  const clientToken = Cookies.get('_client');
  const uid = Cookies.get('_uid');

  if (!accessToken || !clientToken || !uid) {
    return Promise.reject(new Error('認証情報が不足しています。'));
  }

  return client.delete('/auth/sign_out', {
    headers: {
      'access-token': accessToken,
      client: clientToken,
      uid: uid,
    },
  });
};

export const getCurrentUser = async () => {
  const accessToken = Cookies.get('_access_token');
  const clientToken = Cookies.get('_client');
  const uid = Cookies.get('_uid');

  if (!accessToken || !clientToken || !uid) {
    throw new Error('認証トークンが存在しません');
  }

  try {
    const response = await client.get('/auth/validate_token', {
      headers: {
        'access-token': accessToken,
        client: clientToken,
        uid: uid,
      },
    });
    return response;
  } catch (error) {
    console.error('getCurrentUser エラー:', error);
    throw error;
  }
};
