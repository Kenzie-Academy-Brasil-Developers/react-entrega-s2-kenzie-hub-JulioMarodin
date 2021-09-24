import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    body,input,button {
        font-family: 'Source Sans Pro', serif;
        font-size: 1rem;
    }

    h1,h2,h3,h4,h5,h6 {
        font-family: 'Open Sans', sans-serif;
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }
`;
