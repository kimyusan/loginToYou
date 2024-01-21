import React, { useEffect, useState } from 'react'
import { SignUpBox, InputBox } from '../../styles/SignUp/SignUp'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../stores/AuthStore';

const SignUpForm = () => {
  const [id,setId] = useState("");
  const [pw,setPw] = useState("");
  const [pw2,setPw2] = useState("");
  const [name,setName] = useState("");
  const [samePw ,setSamePw] = useState(false);
  const {PATH} = useAuthStore();

  const navigate = useNavigate();

  const changeId = (event : React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value)
  }

  const changePw = (event : React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value)
  }

  const changePw2 = (event : React.ChangeEvent<HTMLInputElement>) => {
    setPw2(event.target.value)
  }

  const changeName = (event : React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const goSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // if (/[a-zA-Z]/.test(id) && /[0-9]/.test(id) && id.length > 5 && id.length < 13) {
    //   console.log("아이디 확인")
    // } else {
    //   alert("아이디 형식이 올바르지 않습니다!")
    //   return
    // }

    // if (/[a-zA-Z]/.test(pw) && /[0-9]/.test(pw) && /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(pw) && 7 < pw.length && pw.length< 16) {
    //   console.log("비밀번호 확인")
    // } else {
    //   alert("비밀번호 형식이 올바르지 않습니다!")
    //   return
    // }

    axios.post(`${PATH}/user/signup`, {
      "email": id,
      "password": pw,
      "name" : name,
    })
    .then((response) => {
      console.log("회원가입 성공")
      navigate("/login")
    })
    .catch((error) => {
      console.log("회원가입 실패" , error.response)
    })

  }

  useEffect(() => {
    if (pw !== "" && pw === pw2) {
      setSamePw(true)
    } else {
      setSamePw(false)
    }
  },[pw,pw2])

  return (
    <SignUpBox onSubmit={goSignUp}>
      <InputBox placeholder="이름" value={name} onChange={changeName}/><div className='comment'>이름 입력</div>
      <InputBox placeholder='아이디' value={id} onChange={changeId} type='email'/><div className='comment'>아이디 입력 (이메일 형식)</div>
      <InputBox placeholder='비밀번호' type='password' value={pw} onChange={changePw}/><div className='comment'>영문, 숫자 ,특수문자 조합 8~15 자리</div>
      <InputBox placeholder='비밀번호 확인' type='password' value={pw2} onChange={changePw2}/>{samePw ? <div className='comment correct'>올바른 비밀번호 입니다.</div>:<div className='comment different'>비밀번호가 올바르지 않습니다.</div>}
      <button type='submit' className='goSignUp'>회원가입</button>
      <p>이미 회원이신가요? <Link to="/login">로그인 하러가기</Link></p>
    </SignUpBox>
  )
}

export default SignUpForm