import React, { useEffect, useState } from 'react'
import { SignUpBox, InputBox, IdBox } from '../../styles/SignUp/SignUp'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
  const [id,setId] = useState("");
  const [pw,setPw] = useState("");
  const [pw2,setPw2] = useState("");
  const [birth, setBirth] = useState("");
  const [email,setEmail] = useState("");
  const [samePw ,setSamePw] = useState(false);
  const [idCheck,setIdCheck] = useState(false);

  const navigate = useNavigate();

  const changeId = (event : React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value)
  }
  
  const checkID = (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    axios.get("",)
    .then((response) => {
      setIdCheck(true)
    })
    .catch((error) => {
      alert("중복된 아이디 입니다.")
    })
  }

  const changePw = (event : React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value)
  }

  const changePw2 = (event : React.ChangeEvent<HTMLInputElement>) => {
    setPw2(event.target.value)
  }

  const changeBirth = (event : React.ChangeEvent<HTMLInputElement>) => {
    setBirth(event.target.value)
  }

  const changeEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const goSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (/[a-zA-Z]/.test(id) && /[0-9]/.test(id) && id.length > 5 && id.length < 13) {
      console.log("아이디 확인")
    } else {
      alert("아이디 형식이 올바르지 않습니다!")
      return
    }

    if (/[a-zA-Z]/.test(pw) && /[0-9]/.test(pw) && /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(pw) && 7 < pw.length && pw.length< 16) {
      console.log("비밀번호 확인")
    } else {
      alert("비밀번호 형식이 올바르지 않습니다!")
      return
    }

    axios.post("", {
      username: id,
      password: pw,
      password2: pw2,
      birthday: birth,
      email,
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
      <IdBox>
        <InputBox placeholder='아이디' value={id} onChange={changeId}/>
        {idCheck ? <button>✔</button> : <button onClick={checkID}>중복체크</button>}
      </IdBox>
      <div className='comment'>영문 또는 영문, 숫자 조합 6~12 자리</div>
      <InputBox placeholder='비밀번호' type='password' value={pw} onChange={changePw}/><div className='comment'>영문, 숫자 ,특수문자 조합 8~15 자리</div>
      <InputBox placeholder='비밀번호 확인' type='password' value={pw2} onChange={changePw2}/>{samePw ? <div className='comment correct'>올바른 비밀번호 입니다.</div>:<div className='comment different'>비밀번호가 올바르지 않습니다.</div>}
      <InputBox type='date' value={birth} onChange={changeBirth}/><div className='comment'>생년월일 확인</div>
      <InputBox placeholder='ex) ssafy1234@gmail.com' type='email' value={email} onChange={changeEmail}/><div className='comment'>이메일 확인</div>
      <button type='submit' className='goSignUp'>회원가입</button>
      <p>이미 회원이신가요? <Link to="/login">로그인 하러가기</Link></p>
    </SignUpBox>
  )
}

export default SignUpForm