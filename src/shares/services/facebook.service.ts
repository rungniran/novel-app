/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const logInFacebook = {
async logInWithFacebook() {
  await this.initFacebook();
  await (window as any).FB.login((response) => {
    if (response.authResponse) {
      return response
    } else {
      return false
    }
  });
  return false;
},
async initFacebook() {
  (window as any).fbAsyncInit =  () => {
    (window as any).FB.init({
      appId: "1008280193454556",
      cookie: true, 
      xfbml: false,
      version: "v13.0",
    });
  };
}

}