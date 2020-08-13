import React, { useState } from 'react';
import SplashPage from './Splash';
// const dotenv = require('dotenv').config();
const { REACT_APP_CLIENT_ID } = process.env;
console.log(process.env.REACT_APP_CLIENT_ID);

const GoogleOAuth = () => {
  const [google, setgoogle] = useState(false);
  function initializeGoogleSignIn() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id: REACT_APP_CLIENT_ID,
        })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          const isSignedIn = authInstance.isSignedIn.get();
          setgoogle({ isSignedIn });

          authInstance.isSignedIn.listen((isSignedIn) => {
            setgoogle({ isSignedIn });
          });
        });
    });
  }

  document.getElementsByTagName('meta')[2].content = REACT_APP_CLIENT_ID;
  let currentView;
  if (google.isSignedIn === true) {
    currentView = <SplashPage />;
  } else {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => initializeGoogleSignIn();
    document.body.appendChild(script);
    currentView = <div className="g-signin2" data-onsuccess="onSignIn"></div>;
  }
  return <div>{currentView}</div>;
};

export default GoogleOAuth;
