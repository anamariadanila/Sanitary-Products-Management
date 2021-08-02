import React from 'react';
// import { GoogleLogin } from 'react-google-login';
// import GoogleButton from 'react-google-button';
import sigla from '../../resources/MinisterulSanatatii.png';
import GoogleBtn from './GoogleBtn.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const responseGoogleLogin = (response) => {
  console.log(response);
};

export default function AutentificareContainer() {
  return (
    <>
      <section class='autentificare'>
        <div class='autentificare__container'>
          <div class='autentificare__container__left'>
            <img src={sigla} alt='MinisterulSanatatii' />
          </div>
          <div
            className={
              localStorage.getItem('isLogged') === 'true'
                ? 'displayNone'
                : 'autentificare__container__right'
            }
          >
            <h1>Autentificare</h1>
            {/* <GoogleButton type='dark' /> */}
            {/* <FontAwesomeIcon icon={['fal', 'coffee']} /> */}
            <GoogleBtn />
            {/* <button>Sign in with google</button> */}
          </div>
        </div>
      </section>
    </>
  );
}
