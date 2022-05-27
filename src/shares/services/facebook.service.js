    // async initFacebook() {
    //   try{
    //     window.fbAsyncInit =  () => {
    //       window.FB.init({

    //         appId  : '1097998624137819',
    //         status : false, 
    //         cookie : false, 
    //         xfbml  : true ,
    //         version: "v13.0",
    //       });
    //     };
    //   }catch (error){
    //        console.log(error);
    //   }
      
    // },
    // async logInWithFacebook() {

        //   this.loadFacebookSDK(document, "script", "facebook-jssdk");
      //   await this.initFacebook();
      //   await window.FB.login( async (response) => {
      //     if (response.authResponse) {
      //     await this.logfacebook(response);
      //     } else {
      //       console.log("close");
      //     }
      //   });
      // }catch (error){
      //   console.log(error);
      // }
    // }

      // async logfacebook(response) {
    //   window.FB.api(
    //     response.authResponse.userID,
    //     { fields: "name,email,picture,first_name,last_name" },
    //     (res) => {
    //       console.log(res);
    //       var login = {
    //         id: res.id,
    //         email: res.email ? res.email : `${res.id}@facebook.com`,
    //         first_name: res.first_name,
    //         last_name: res.last_name,
    //         name: res.name,
    //       };
    //       localStorage.setItem("imagefacebook", res.picture.data.url);
    //       localStorage.setItem("social_auth", JSON.stringify(login));
    //       Gatway.postService("/login-facebook", login ).then((res) => {
    //         let token = res.data.data.token;
    //         let status = true;
    //         // this.$store.commit("login", { token, status });
    //       });
    //     }
    //   );
    // },