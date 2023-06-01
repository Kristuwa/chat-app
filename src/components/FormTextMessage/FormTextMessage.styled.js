import { Field, Form } from "formik";
import styled from "styled-components";

export const ContainerFormMessage = styled(Form)`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  height: 90px;
  background-color: ${(props) => props.theme.color.bgAsideColor};
`;

export const InputMessage = styled(Field)`
  height: 50px;
  width: 1050px;
  padding: 10px;
  border-radius: 5px;
`;
