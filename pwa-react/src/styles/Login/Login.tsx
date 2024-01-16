import styled from "styled-components";

const Logo = styled.div`
    width: 100%;
    height: 70vh;
    font-size: 40px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const MiddleMsg = styled.div`
    width: 100%;
    height: 30px;
    margin: 0 auto;
    margin-bottom: 30px;
    text-align: center;
    color: #8A8A8A;
    font-size: 17px;
    position: relative;
    display: flex;
    justify-content: center;
    
    & div {
        position: absolute;

        animation: motion 0.5s linear 0s infinite alternate; 
        @keyframes motion {
        0% {margin-top: 0px;}
        100% {margin-top: 15px;}
        }
    }
`

const SnsLogin = styled.div`
    display: flex;
    flex-direction: row;
    height: 10vh;
`

interface SnsLoginBtn {
    $img: string
}

const LoginBtn = styled.div<SnsLoginBtn>`
    width: 33.3%;
    height: auto;
    background-image: ${(props) => `url(${props.$img})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`
export { Logo, MiddleMsg, SnsLogin, LoginBtn };