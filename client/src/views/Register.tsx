import React from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosResponse } from 'axios';

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Emails is required'),
  password: Yup.string().required('Password is required')
});

export class Register extends React.Component {
  state = { toLogin: false };

  render() {
    if (this.state.toLogin) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { msg: 'Account created' }
          }}
        />
      );
    }

    return (
      <div>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: ''
          }}
          validationSchema={RegisterSchema}
          onSubmit={(
            values: RegisterValues,
            { setSubmitting }: FormikHelpers<RegisterValues>
          ) => {
            axios
              .post('/users', values)
              .then((res: AxiosResponse) => {
                setSubmitting(false);
                this.setState({ toLogin: true });
              })
              .catch(err => {
                setSubmitting(false);
                //TODO: Show error to user
                console.log(err.response.data.errors);
              });
          }}
          render={({ errors, isSubmitting }) => (
            <Form style={{ display: 'flex' }}>
              <label htmlFor="name">Name</label>
              <Field
                id="name"
                name="name"
                placeholder="Enter name"
                type="text"
              />
              {errors.name ? errors.name : null}

              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="Enter email"
                type="text"
              />
              {errors.email ? errors.email : null}

              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                placeholder="Enter password"
                type="password"
              />
              {errors.password ? errors.password : null}

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        />
        <p>Already have a account?</p>
        <a href="/login">Login</a>
      </div>
    );
  }
}
