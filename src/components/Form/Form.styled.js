import { Field, Form } from "formik";
import styled from "styled-components";

export const FormContainer = styled(Form)`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Input = styled(Field)`
  border-radius: 5px;
  padding: 5px;
`;

export const ButtonForm = styled.button`
  display: block;
  height: 40px;

  font-family: inherit;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.2;

  color: ${(props) => props.theme.color.secondaryColor};
  background-color: ${(props) => props.theme.color.bgBtn};
  box-shadow: 0px 3.43693px 3.43693px rgba(0, 0, 0, 0.25);
  border-radius: 10.3108px;

  transition: background-color 250ms linear;

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.color.accentColor};
  }
`;
