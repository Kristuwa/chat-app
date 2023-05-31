import { Form } from "../components/Form/Form";
import { Container } from "./Home.styled";

const Home = () => {
  return (
    <main>
      <Container home="home">
        <Form />
      </Container>
    </main>
  );
};

export default Home;
