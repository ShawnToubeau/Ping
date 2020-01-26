import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Interfaces
import { Auth } from '../reducers/authReducer';
// Model
import User from '../models/User';
// Actions
import { logoutUser } from '../actions/authActions';
// Store
import { RootState } from 'typesafe-actions';

interface Props {
  logoutUser: () => void;
  errors: RootState;
  auth: Auth;
}

class Dashboard extends React.Component<Props> {
  render() {
    const { auth } = this.props;
    let user: User = {};

    if (auth && auth.isAuthenticated) {
      user = auth.user;
    }

    return (
      <div>
        <h1>Welcome {user.name}</h1>
        <button onClick={() => this.props.logoutUser()}>Logout</button>
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
      logoutUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
