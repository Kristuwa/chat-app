import { Formik } from "formik";
import * as Yup from "yup";
import { useCallback } from "react";
import {
  ButtonForm,
  FieldContainer,
  FormContainer,
  Input,
} from "./Form.styled";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

const validateSchema = Yup.object().shape({
  idInstance: Yup.string().required("Required"),
  apiTokenInstance: Yup.string().required("Required"),
});

export const Form = () => {
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (values, { resetForm }) => {
      dispatch(logIn(values));
      resetForm();
    },
    [dispatch]
  );

  return (
    <Formik
      initialValues={{
        idInstance: "",
        apiTokenInstance: "",
      }}
      validationSchema={validateSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <FormContainer>
          <FieldContainer>
            <label htmlFor="idInstance">Id</label>
            <Input
              id="idInstance"
              name="idInstance"
              placeholder="Enter idInstance"
            />
            {errors.idInstance && touched.idInstance ? (
              <div>{errors.idInstance}</div>
            ) : null}
          </FieldContainer>
          <FieldContainer>
            <label htmlFor="apiTokenInstance">Token</label>
            <Input
              id="apiTokenInstance"
              name="apiTokenInstance"
              placeholder="Enter apiTokenInstance"
            />
            {errors.apiTokenInstance && touched.apiTokenInstance ? (
              <div>{errors.apiTokenInstance}</div>
            ) : null}
          </FieldContainer>

          <ButtonForm type="submit">Submit</ButtonForm>
        </FormContainer>
      )}
    </Formik>
  );
};
