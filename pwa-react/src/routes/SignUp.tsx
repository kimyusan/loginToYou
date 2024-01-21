import React from 'react'
import { Logo } from "../styles/SignUp/SignUp"
import SignUpForm from '../components/SignUp/SignUpForm'

const SignUp = () => {
  return (
    <Logo>
      <div className='logo'>SPY x COUPLE</div>
      <SignUpForm></SignUpForm>
    </Logo>
  )
}

export default SignUp