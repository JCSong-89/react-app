import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
  background: black;
`;

export default HeaderWrapper;
