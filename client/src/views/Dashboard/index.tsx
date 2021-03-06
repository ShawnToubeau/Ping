import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import PostForm from './PostForm';

// Actions
import { logoutUser } from '../../actions/authActions';
// Interfaces
import { RootState } from 'typesafe-actions';
import { Auth } from '../../reducers/authReducer';
import User from '../../models/User';
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
      <div className="Dashboard">
        <div className="dashboard-header">
          <h1>Welcome {user.name}</h1>
          <button onClick={() => this.props.logoutUser()}>Logout</button>
        </div>
        <div className="post-content">
          <div className="create-post">
            <PostForm />
          </div>
          <div className="user-feed"></div>
        </div>
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
