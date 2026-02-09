import { useState } from 'react';
import TitleText from '../shared/text/titleText';
import NormalText from '../shared/text/normalText';
import SimpleInput from '../shared/form/input/simpleInput';
import BlackButton from '../shared/button/blackButton';
import { AuthenticationProps } from './type/AuthenticationProps';
import SimpleButton from '../shared/button/simpleButton';
import keycloak from './keycloak';


function Signin({onClick}: AuthenticationProps) {
  const [username, setUsername] = useState("");

  const signin = () => {
    keycloak.register({
      redirectUri: window.location.origin,
      loginHint: username || undefined,
    });
  };

  return(
    <div className="w-1/2 flex flex-col items-center gap-4">
      <div className="absolute top-6 right-6"><SimpleButton text="Login" onclick={() => onClick(true)}/></div>

      <TitleText text="Create an account"/>
      <NormalText text="Enter your username below to create your account"/>
      <SimpleInput onChange={setUsername} placeholder="username"/>
      <BlackButton text={'Sign in'} onclick={signin} type={'submit'}/>
    </div>
  )
}

export default Signin;
