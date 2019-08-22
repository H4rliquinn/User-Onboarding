import React from 'react';
import { withFormik,Form,Field } from 'formik';
import * as Yup from "yup";
import axios from "axios";

function LoginForm({ values, errors, touched, isSubmitting }) {
    return (
      <Form>
        <div>
          {touched.name && errors.name && <p>{errors.name}</p>}
          <Field type="text" name="name" placeholder="Name" />
        </div>          
        <div>
          {touched.email && errors.email && <p>{errors.email}</p>}
          <Field type="email" name="email" placeholder="Email" />
        </div>
        <div>
          {touched.password && errors.password && <p>{errors.password}</p>}
          <Field type="password" name="password" placeholder="Password" />
        </div>
        <label>
          {touched.tos && errors.tos && <p>{errors.tos}</p>}
          <Field type="checkbox" name="tos" checked={values.tos} />
          Accept TOS
        </label>
        <button disabled={isSubmitting}>Submit</button>
      </Form>
    );
  }

  const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, tos, meal }) {
      return {
        name: name || "",         
        email: email || "",
        password: password || "",
        tos: tos || false,
        meal: meal || "silver"
      };
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("A name is required"),
      email: Yup.string()
        .email("Email not valid")
        .required("Email is required"),
      password: Yup.string()
        .min(16, "Password must be 16 characters or longer")
        .required("Password is required"),
      tos: Yup.bool()
        .required("You muse accept the Terms of Service")
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
      if (values.email === "alreadytaken@atb.dev") {
        setErrors({ email: "That email is already taken" });
      } else {
        axios
          .post("https://reqres.in/api/users", values)
          .then(res => {
            console.log(res); // Data was created successfully and logs to console
            resetForm();
            setSubmitting(false);
          })
          .catch(err => {
            console.log(err); // There was an error creating the data and logs to console
            setSubmitting(false);
          });
      }
    }
  })(LoginForm);

  export default FormikLoginForm;