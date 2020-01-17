import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

export class Register extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        onSubmit={(values: RegisterValues, { setSubmitting }: FormikHelpers<RegisterValues>) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
        render={() => (
          <Form>
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" placeholder="Enter name" type="text" />

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