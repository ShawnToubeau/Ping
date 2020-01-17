import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface LoginValues {
  email: string;
  password: string;
}
export class Login extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
        render={() => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" placeholder="Enter email" type="text" />

            <label htmlFor="password">Password</label>
            <Field id="password" name="password" placeholder="Enter password" type="password" />

            <button type="submit" style={{ display: 'block' }}>
              Submit
          </button>
          </Form>
        )}
      />
    )
  }
}