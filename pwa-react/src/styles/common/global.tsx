import { createGlobalStyle, DefaultTheme } from "styled-components";

const Global = createGlobalStyle`
    body, html {
        margin: 0;
        border: 0;
        background-color: #F9F9F9;
        font-family: 'Noto Sans KR';
    }

    button {
        font-family: 'Noto Sans KR';
    }
`;

export const pink: DefaultTheme = {
  color: {
    main: "#ff83a8",
    sub1: "#ff9aab",
    sub2: "pink",
    sub3: "#ffcdd9",
    sub4: "#ffdde2",
    point: "hotpink",
  },
};

export const blue: DefaultTheme = {
  color: {
    main: "#8983ff",
    sub1: "#698be9",
    sub2: "#7c8ada",
    sub3: "#cdd0ff",
    sub4: "#dde2ff",
    point: "#3967da",
  },
};

export default Global;
