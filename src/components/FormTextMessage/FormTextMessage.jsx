import { Formik } from "formik";
import * as Yup from "yup";
import { FieldContainer } from "../Form/Form.styled";
import { ContainerFormMessage, InputMessage } from "./FormTextMessage.styled";
import { FaLocationArrow } from "react-icons/fa";
import { ButtonAdd } from "../AsideComponent/AsideComponent.styled";

const validateSchema = Yup.object().shape({
  text: Yup.string().required("Required"),
});

export const FormTextMessage = ({ onSubmitMessage }) => {
  return (
    <Formik
      initialValues={{
        text: "",
      }}
      validationSchema={validateSchema}
      onSubmit={onSubmitMessage}
    >
      {({ errors, touched }) => (
        <ContainerFormMessage>
          <FieldContainer>
            <InputMessage
              id="text"
              name="text"
              placeholder="Enter text message"
            />
            {errors.text && touched.text ? <div>{errors.text}</div> : null}
          </FieldContainer>

          <ButtonAdd type="submit" aria-label="Send message">
            <FaLocationArrow />
          </ButtonAdd>
        </ContainerFormMessage>
      )}
    </Formik>
  );
};
