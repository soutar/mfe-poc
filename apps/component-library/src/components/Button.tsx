import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  border-radius: 5px;
  background-color: blue;
  color: white;
  padding: 8px 12px;
  font-size: 14px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white, 0 0 0 4px blue;
  }
`;

function Button(props: React.ComponentProps<typeof StyledButton>) {
  return <StyledButton {...props} />;
}

export default Button;
