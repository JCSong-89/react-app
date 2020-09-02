import styled from "styled-components";

const CenterColumn = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  font-size: 50px;
  border-radius: 3px;
  text-align: center;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
  margin: 0 auto;
  margin-top: 500px;
`;

export default CenterColumn;
