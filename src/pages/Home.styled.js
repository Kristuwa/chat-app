import styled from "styled-components";
import bg from "../img/bg.jpg";

export const Container = styled.section`
  height: 100vh;
  min-width: 320px;
  background-color: #cccccc;
  background-image: url(${bg});
  margin-left: auto;
  margin-right: auto;
  display: ${(props) => (props.home === "home" ? "flex" : "block")};
  align-items: ${(props) => (props.home === "home" ? "center" : "start")};
  justify-content: ${(props) => (props.home === "home" ? "center" : "start")};
`;
