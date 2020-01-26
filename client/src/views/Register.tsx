import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { registerUser } from '../actions/authActions';

// Interfaces
import User from '../models/User';
interface Props {
  registerUser: (userData: User) => void;
}

// Form validation schema
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Emails is required'),
  password: Yup.string().required('Password is required')
});

class Register extends React.Component<Props> {
  render() {
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

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      registerUser
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Register);
