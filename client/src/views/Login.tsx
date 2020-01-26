import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Model
import User from '../models/User';
// Actions
import { loginUser } from '../actions/authActions';
// Store
import { RootState } from 'typesafe-actions';

interface Props {
  loginUser: (userData: User) => void;
  errors: RootState;
}

// Form validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Emails is required'),
  password: Yup.string().required('Password is required')
});

class Login extends React.Component<Props> {
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            email: '',
            password: '',
            name: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={(user: User, { setSubmitting }: FormikHelpers<any>) => {
            this.props.loginUser(user);
            setSubmitting(false);
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

const mapStateToProps = (state: RootState) => ({
  errors: state.errors
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      loginUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
