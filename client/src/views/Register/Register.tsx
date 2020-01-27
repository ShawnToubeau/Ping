import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Register.scss';

// Actions
import { registerUser } from '../../actions/authActions';

// Interfaces
import User from '../../models/User';
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
      <div className="Register">
        <h1>Register</h1>
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
            <Form>
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  type="text"
                />
                <div className="error">{errors.name ? errors.name : null}</div>
              </div>

              <div className="form-field">
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  type="text"
                />
                <div className="error">
                  {errors.email ? errors.email : null}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                />
                <div className="error">
                  {errors.password ? errors.password : null}
                </div>
              </div>

              <button type="submit" disabled={isSubmitting}>
                Register
              </button>
            </Form>
          )}
        />
        <div className="referrer">
          <p>Already have a account?</p>
          <a href="/login">Login</a>
        </div>
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
