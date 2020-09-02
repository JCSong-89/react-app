import React from "react";
import styled from "styled-components";

const Container = styled.input`
  border: 1px solid #018dc4;
  background-color: ${(props) => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
  opacity: 0.5;
`;

const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text",
}) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
  />
);

export default Input;
