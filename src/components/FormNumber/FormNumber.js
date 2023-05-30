import { Formik } from "formik";
import * as Yup from "yup";
import {
  ButtonForm,
  FieldContainer,
  FormContainer,
  Input,
} from "../Form/Form.styled";

const validateSchema = Yup.object().shape({
  phone: Yup.number().required("Required"),
});

export const FormNumber = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        phone: "",
      }}
      validationSchema={validateSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <FormContainer>
          <FieldContainer>
            <label htmlFor="phone">Telephone number</label>
            <Input id="phone" name="phone" placeholder="Enter phone" />
            {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
          </FieldContainer>

          <ButtonForm type="submit">Submit</ButtonForm>
        </FormContainer>
      )}
    </Formik>
  );
};
