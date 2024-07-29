import { CredentialResponse, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../api/fetchApi';
import { useAuth } from '../hook/useAuth';
export const LoginPage = () => {
  const { onLogin } = useAuth();
  const navigate = useNavigate();

  const onHandleSuccess = async (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    const dataUser = await fetchApi('/login-google', 'POST', credential!);

    if (dataUser.error) {
      console.log(dataUser.message);
      return;
    }
    const { user } = dataUser;
    onLogin(user);
    navigate('/user-profile');
  };
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (tokenResponse) => {
      const dataUser = await fetchApi('/login-googlev2', 'POST', '', tokenResponse.code);
      if (dataUser.error) {
        console.log(dataUser.message);
        return;
      }
      const { user } = dataUser;
      onLogin(user);
      navigate('/user-profile');
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const onHandleError = () => {};
  return (
    <div>
      <GoogleLogin onSuccess={onHandleSuccess} onError={onHandleError} />
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
};
