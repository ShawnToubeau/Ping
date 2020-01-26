import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

// Model
import User from '../models/User';
// Actions
import { registerUser } from '../actions/authActions';
// Store
import { RootState } from 'typesafe-actions';
import { Auth } from '../reducers/authReducer';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Emails is required'),
  password: Yup.string().required('Password is required')
});

interface Props {
  registerUser: (userData: User) => void;
  auth: Auth;
}

class Register extends React.Component<Props> {
  render() {
    const { auth } = this.props;

    // Redirect if logged in
    if (auth.isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: '/dashboard'
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
          onSubmit={(user: User, { setSubmitting }: FormikHelpers<any>) => {
            this.props.registerUser(user);
            setSubmitting(false);
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

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      registerUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
