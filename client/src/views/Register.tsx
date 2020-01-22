import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import User from '../models/User';
import { RootState } from 'typesafe-actions';

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  errors: state.errors,
  history: 
});

const dispatchProps = {
  registerUser: registerUser,
}

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Emails is required'),
  password: Yup.string().required('Password is required')
});

// interface Props {
//   registerUser(userData: User, history: any): any;
//   errors: {};
//   history: any;
// }
type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

type State = {
  auth?: string;
  errors?: {};
}

class Register extends React.Component<Props, State> {
  static propTypes: any;
  constructor(props: Props) {
    super(props);

    this.state = {
      auth: '',
      errors: {}
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    return true;
  }

  render() {
    const { errors } = this.state;

    console.log(errors);

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
            user: User,
            { setSubmitting }: FormikHelpers<User>
          ) => {
            this.props.registerUser(user, this.props.history);
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};



// TODO: wrap component withRouter
export default connect(mapStateToProps, dispatchProps)(Register);
