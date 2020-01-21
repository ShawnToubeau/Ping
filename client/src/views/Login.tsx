import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosResponse } from 'axios';

interface LoginValues {
  email: string;
  password: string;
}

interface Props extends RouteComponentProps {}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Emails is required'),
  password: Yup.string().required('Password is required')
});
export class Login extends React.Component<Props> {
  state = { loggedIn: false };

  render() {
    // TODO: unable to read values on state, might be TS bug
    // const { msg } = this.props.location.state || '';
    // console.log(msg);

    if (this.state.loggedIn) {
      return (
        <Redirect
          to={{
            pathname: '/dashboard',
            state: { msg: 'Account created' }
          }}
        />
      );
    }

    return (
      <div>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={(
            values: LoginValues,
            { setSubmitting }: FormikHelpers<LoginValues>
          ) => {
            axios
              .post('/login', values)
              .then((res: AxiosResponse) => {
                setSubmitting(false);
                // this.setState({ loggedIn: true });

                // TODO:
                // Save jwt to local storage
                // set token to auth header
                // decode to get user data
                // set user
              })
              .catch(err => {
                setSubmitting(false);
                // TODO: add alert
                console.log(err);
              });
          }}
          render={({ errors, isSubmitting }) => (
            <Form>
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
        <p>Need a account?</p>
        <a href="/register">Register</a>
      </div>
    );
  }
}
