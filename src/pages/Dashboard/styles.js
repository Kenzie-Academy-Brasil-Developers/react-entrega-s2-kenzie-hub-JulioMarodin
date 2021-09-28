import styled from 'styled-components';

export const Container = styled.div`
  h2 {
    text-align: center;
  }

  form {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input {
    margin-bottom: 10px;
  }

  button {
    margin-bottom: 10px;
    background-color: #03045e;
    color: #fff;
    margin: 1px solid transparent;
    border: none;
    border-radius: 3px;
    width: 80px;
    height: 30px;
  }

  div > div > button {
    height: 45px;
  }

  .button_add {
    height: 55px;
    text-align: center;
    margin-top: 5px;
  }

  button:hover {
    background-color: #fff;
    color: #03045e;
    border: 1px solid #03045e;
  }

  .div__container {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 30px;
  }

  .div__techs {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
  }
`;
