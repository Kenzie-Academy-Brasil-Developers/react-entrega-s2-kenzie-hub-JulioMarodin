import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 90vh;

  div > button {
    margin-top: 10px;
    margin-right: 10px;
    background-color: #03045e;
    color: #fff;
    margin: 1px solid transparent;
    border: none;
    border-radius: 3px;
    width: 90px;
    height: 30px;
  }

  div > button:hover {
    background-color: #fff;
    color: #03045e;
    border: 1px solid #03045e;
  }
`;
