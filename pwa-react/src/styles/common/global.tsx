import { createGlobalStyle, DefaultTheme } from "styled-components";

const Global = createGlobalStyle`
    body, html {
        margin: 0;
        border: 0;
        background-color: ${(props) => props.theme.color.bgColor};
        font-family: 'Noto Sans KR';
        overscroll-behavior: none;
    }

    button {
        font-family: 'Noto Sans KR';
    }

    textarea {
      font-family: 'Noto Sans KR';
      font-size: 1rem;
    }

`;

export const pink: DefaultTheme = {
  color: {
    main: "#ff83a8",
    sub1: "#ff9aab",
    sub2: "#ffc0cb",
    sub3: "#ffcdd9",
    sub4: "#ffdde2",
    sub5: "#ffe7ec",
    point: "#ff69b4",
    grey: "#8a8a8a",
    lightgrey: "#e2e2e2",
    bgColor: "#f9f9f9",
  },
};

export const blue: DefaultTheme = {
  color: {
    main: "#8983ff",
    sub1: "#698be9",
    sub2: "#a4b0f7",
    sub3: "#cdd0ff",
    sub4: "#dde2ff",
    sub5: "#eaedff",
    point: "#3967da",
    grey: "#8a8a8a",
    lightgrey: "#e2e2e2",
    bgColor: "#f9f9f9",
  },
};

export const green: DefaultTheme = {
  color: {
    main: "#86a462",
    sub1: "#638d50",
    sub2: "#8ab478",
    sub3: "#cbd2a8",
    sub4: "#ddecce",
    sub5: "#e8f1df",
    point: "#7f9618",
    grey: "#8a8a8a",
    lightgrey: "#e2e2e2",
    bgColor: "#f9f9f9",
  },
};

export const beige: DefaultTheme = {
  color: {
    main: "#767569",
    sub1: "#929388",
    sub2: "#b3b0a6",
    sub3: "#d4cdc3",
    sub4: "#f8f4e3",
    sub5: "#ebe8d9",
    point: "#7b7369",
    grey: "#8a8a8a",
    lightgrey: "#e2e2e2",
    bgColor: "#f9f9f9",
  },
};

export default Global;
