import BlackButton from '../shared/button/blackButton';
import TitleText from '../shared/text/titleText';
import NormalText from '../shared/text/normalText';
import SimpleInput from '../shared/form/input/simpleInput';
import { useState } from 'react';
import { AuthenticationProps } from './type/AuthenticationProps';
import SimpleButton from '../shared/button/simpleButton';
import keycloak from './keycloak';

function Login({onClick}: AuthenticationProps) {
  const [username, setUsername] = useState("");

  const login = () => {
    keycloak.login({
      redirectUri: window.location.origin,
      loginHint: username || undefined,
    });
  };

  return(
    <div className="w-1/2 flex flex-col items-center gap-4">
      <div className="absolute top-6 right-6"><SimpleButton text="Signin" onclick={() => onClick(false)}/></div>

      <TitleText text="Login"/>
      <NormalText text="Enter your credentials to login"/>
      <SimpleInput onChange={setUsername} placeholder="username"/>
      <BlackButton text={'Log in'} onclick={login} type={'submit'}/>
    </div>
  )
}

export default Login;
