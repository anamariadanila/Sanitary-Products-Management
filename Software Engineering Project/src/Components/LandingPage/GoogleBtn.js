import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout, useGoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';

const CLIENT_ID =
  '1020267697648-k52rp092unf1sf9jghe0p8qbir0muf8m.apps.googleusercontent.com';

class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    // let { signIn } = useGoogleLogin();

    this.state = {
      isLogined:
        localStorage.getItem('isLogged') != null
          ? localStorage.getItem('isLogged')
          : false,
      accessToken: '',
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login(response) {
    if (response.accessToken) {
      localStorage.setItem('isLogged', 'true');
      this.setState((state) => ({
        isLogined: true,
        accessToken: response.accessToken,
      }));
      window.location.reload(false);
    }
  }

  logout(response) {
    localStorage.setItem('isLogged', 'false');
    this.setState((state) => ({
      isLogined: false,
      accessToken: '',
    }));
    window.location.reload(false);
  }

  handleLoginFailure(response) {
    alert('Failed to log in');
  }

  handleLogoutFailure(response) {
    alert('Failed to log out');
  }

  render() {
    return (
      <div>
        {this.state.isLogined === 'true' ? (
          <>
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText='Logout'
              onLogoutSuccess={this.logout}
              onFailure={this.handleLogoutFailure}
            ></GoogleLogout>
            {/* <Redirect to='/inventar'></Redirect> */}
          </>
        ) : (
          <>
            <GoogleLogin
              clientId={CLIENT_ID}
              // buttonText='Login'
              onSuccess={this.login}
              onFailure={this.handleLoginFailure}
              cookiePolicy={'single_host_origin'}
              responseType='code,token'
            />
            <Redirect to='/'></Redirect>
          </>
        )}
        {/* {this.state.accessToken ? (
        //   <h5>
        //     Your Access Token: <br />
        //     <br /> {this.state.accessToken}
        //   </h5>
        ) : null} */}
      </div>
    );
  }
}

export default GoogleBtn;
