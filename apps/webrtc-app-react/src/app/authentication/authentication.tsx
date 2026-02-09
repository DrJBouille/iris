import { useState } from 'react';
import Login from './login';
import Signin from './signin';

function Authentication() {
  const [isLogin, setIsLogin] = useState(true);

  return(
    <div className="flex w-screen h-screen">
      <div className="w-1/2 bg-gray-100"></div>
      <div className="w-1/2 flex justify-center items-center">
        {isLogin ? <Login onClick={setIsLogin}/> : <Signin onClick={setIsLogin}/>}
      </div>
    </div>
  )
}

export default Authentication;
