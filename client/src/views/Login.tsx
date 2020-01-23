import React from 'react';
import { Redirect } from 'react-router-dom';
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

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Emails is required'),
  password: Yup.string().required('Password is required')
});

interface Props {
  loginUser: (userData: User) => void;
  errors: RootState;
  auth: RootState;
}
class Login extends React.Component<Props> {
  // shouldComponentUpdate(nextProps: Props) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  //   return true;
  // }

  render() {
    const { errors, auth } = this.props;
    console.log(this.props);
    console.log(auth);
    // console.log(errors);

    // if (auth.auth.isAuthenticated) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: '/dashboard',
    //         state: { msg: 'Account created' }
    //       }}
    //     />
    //   );
    // }

    return (
      <div>
        <Formik
          initialValues={{
            email: '',
            password: '',
            name: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={(user: User, { setSubmitting }: FormikHelpers<User>) => {
            console.log('submit');
            this.props.loginUser(user);
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
  errors: state.errors,
  auth: state.auth
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
