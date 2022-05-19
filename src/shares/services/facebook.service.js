/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
 function initFacebook() {
    window.fbAsyncInit =  () => {
      window.FB.init({
        appId: "1008280193454556",
        cookie: false, 
        xfbml: false,
        version: "v13.0",
      });
    };
  }
export const logInFacebook = {
  async logInWithFacebook() {
    await initFacebook();
    await window.FB.login((response) => {
      if (response.authResponse) {
        return response
      } else {
        return false
      }
    });
    return false;
  },
 
  
  }