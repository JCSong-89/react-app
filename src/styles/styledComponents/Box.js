import styled from "styled-components";

const Box = styled.div`
    ${props => props.theme.whiteBox}
    border-radius: 0px;
    width: 350px;
`;

export default Box;