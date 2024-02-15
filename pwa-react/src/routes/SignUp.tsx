import React from 'react'
import { Logo } from "../styles/SignUp/SignUp"
import SignUpForm from '../components/SignUp/SignUpForm'
import AppLogo from "../styles/common/AppLogo.png"

const SignUp = () => {
  return (
    <Logo>
      <img src={AppLogo} alt='앱 로고'></img>
      <SignUpForm></SignUpForm>
    </Logo>
  )
}

export default SignUp