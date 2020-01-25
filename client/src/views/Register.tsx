import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';

// Model
import User from '../models/User';
// Actions
import { registerUser, loginUser } from '../actions/authActions';
// Store
import { RootState } from 'typesafe-actions';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Emails is required'),
  password: Yup.string().required('Password is required')
});

interface Props {
  loginUser: (userData: User) => void;
  registerUser: (userData: User) => void;
  errors: RootState;
  history: RouteComponentProps;
}

class Register extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    return true;
  }

  render() {
    const { errors } = this.props;
    console.log(this.props);
    console.log(this.props.loginUser);

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
  errors: state.errors
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      registerUser,
      loginUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
