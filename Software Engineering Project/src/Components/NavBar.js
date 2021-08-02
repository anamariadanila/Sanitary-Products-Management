import React from 'react';
import sigla from '../resources/SiglaGuvern.png';
import GoogleBtn from './LandingPage/GoogleBtn';
// import '../css/landingPage.js';

// function toggleButton() {
//   navBarLinks.classList.toggle('active');
// }

class NavBar extends React.Component {
  componentDidMount() {
    const toggleButton = document.getElementsByClassName(
      'headerContainer__hamburger'
    )[0];
    const navBarLinks = document.getElementsByClassName(
      'headerContainer__right'
    )[0];

    toggleButton.addEventListener('click', () => {
      navBarLinks.classList.toggle('active');
    });
  }

  render() {
    return (
      <>
        <header className='headerContainer'>
          <div className='headerContainer__left'>
            <a href='/'>
              <ul>
                <li>
                  <img src={sigla} alt='siglaGuvern' />
                </li>
                <li className='headerContainer__left__text'>
                  Ministerul Sănătății
                </li>
              </ul>
            </a>
          </div>
          <div className='headerContainer__right'>
            <ul>
              <a href='/istoric'>
                <li
                  className={
                    localStorage.getItem('isLogged') === 'false'
                      ? 'displayNone'
                      : ''
                  }
                >
                  Istoric
                </li>
              </a>
              <a href='/inventar'>
                <li
                  className={
                    localStorage.getItem('isLogged') === 'false'
                      ? 'displayNone'
                      : ''
                  }
                >
                  Inventar
                </li>
              </a>
              <a href=''>
                <li
                  className={
                    localStorage.getItem('isLogged') === 'false'
                      ? 'displayNone'
                      : ''
                  }
                >
                  <GoogleBtn></GoogleBtn>
                </li>
              </a>
            </ul>
          </div>
          <a href='#' className='headerContainer__hamburger'>
            <span></span>
            <span></span>
            <span></span>
          </a>
        </header>
      </>
    );
  }
}

export default NavBar;
