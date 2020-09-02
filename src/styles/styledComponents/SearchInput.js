import styled from "styled-components";
import Input from "./Input";

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  font-size: 14px;
  border-radius: 3px;
  text-align: center;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
  width: 100px;
`;

export default SearchInput;
