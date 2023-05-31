import { Formik } from "formik";
import * as Yup from "yup";
import {
  ButtonForm,
  FieldContainer,
  FormContainer,
  Input,
} from "../Form/Form.styled";

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
        <FormContainer>
          <FieldContainer>
            <Input id="text" name="text" placeholder="Enter text message" />
            {errors.text && touched.text ? <div>{errors.text}</div> : null}
          </FieldContainer>

          <ButtonForm type="submit">Submit</ButtonForm>
        </FormContainer>
      )}
    </Formik>
  );
};
