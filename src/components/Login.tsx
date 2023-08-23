import { useState } from "react";
import {photu} from '../assets/images'

function Login() {
    const [count, setCount] = useState(1)
  return (
    <div>
      Login from outside
      {count}
      <img src={photu} alt="photu" onClick={()=> setCount(count+1)} />
    </div>
  )
}

export default Login
