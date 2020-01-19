import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
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
  render() {
    // TODO: unable to read values on state, might be TS bug
    // const { msg } = this.props.location.state || '';
    // console.log(msg);

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
            const dbUrl = 'http://localhost:4000/login';

            axios
              .post(dbUrl, values)
              .then((res: AxiosResponse) => {
                setSubmitting(false);
                console.log(res);
              })
              .catch(err => {
                setSubmitting(false);
                console.log(err);
              });

            console.log(values);
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
