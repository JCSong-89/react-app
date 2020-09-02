import styled from "styled-components";

const Button = styled.button`
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  cursor: pointer;
  padding: 7px 10px 8px;
  border: 1px solid #018dc4;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  font: normal 15px / normal "Times New Roman", Times, serif;
  -o-text-overflow: clip;
  text-overflow: clip;
  background: black;
  -webkit-box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  text-shadow: -1px -1px 0 rgba(15, 73, 168, 0.66);
  -webkit-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
  -moz-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
  -o-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
  transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
`;

export default Button;
