import React from "react";
import styled, { css } from "styled-components";

const Button = (props) => {
  return (
    <StButton {...props} disabled={props.disabled}>
      {props.children}
      {/* 부모에서 자식꺼를 쓸 수 있는 것 
      부모 : 
      <>
      <자식/>
      </ㅈ>
      */}
    </StButton>
  );
};

export default Button;

const StButton = styled.button`
  border: 1px solid gray;
  background-color: #fff;
  height: 46px;
  border-radius: 8px;
  background-color: ${({ bgColor, disabled }) => (disabled ? "#ddd" : bgColor)};
  cursor: pointer;

  ${({ size }) => {
    switch (size) {
      case "large":
        return css`
          width: 100%;
        `;
      case "medium":
        return css`
          width: 80px;
        `;
      case "small":
        return css`
          width: 30px;
          height: 30px !important;
        `;
      default:
        return css`
          width: 120px;
        `;
    }
  }}
`;
