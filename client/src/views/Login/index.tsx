import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Model
import User from '../../models/User';
// Actions
import { loginUser } from '../../actions/authActions';
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
    .required('Email is required'),
  password: Yup.string().required('Password is required')
});

class Login extends React.Component<Props> {
  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={(user: User, { setSubmitting }: FormikHelpers<any>) => {
            this.props.loginUser(user);
            setSubmitting(false);
          }}
          render={({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  type="text"
                />
                <div className="error">
                  {errors.email && touched.email ? errors.email : null}
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
                  {errors.password && touched.password ? errors.password : null}
                </div>
              </div>

              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </Form>
          )}
        />
        <div className="referrer">
          <p>Need a account?</p>
          <a href="/register">Register</a>
        </div>
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
