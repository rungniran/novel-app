<template>
  <div class="login" @click="onmouse == false ? close() : null">
    <div class="login-crad">
      <div class="login-img">
        <img :src="$path.image('25.png')" />
      </div>
      <div class="container-from login-from">
        <div class="socail">
          <div class="center text-login">เข้าสู่ระบบ</div>
          
          <div class="google" @click="logingoogle()">
            <img src="../assets/images/image 5.png" width="18px" />
            เข้าสู่ระบบด้วย Google
          </div>

              <!-- <GoogleLogin :params="params" :onSuccess="onSuccess($event)" ><div class="google">
            <img src="../assets/images/image 5.png" width="18px" />
            เข้าสู่ระบบด้วย Google
          </div></GoogleLogin> -->

<!-- <GoogleLogin :params="params" :logoutButton="true">Logout</GoogleLogin> -->
            <GoogleLogin :params="params"  :onSuccess="onSuccess" :onFailure="onFailure">

             <div class="google">
            <img src="../assets/images/image 5.png" width="18px" />
            เข้าสู่ระบบด้วย Google
          </div>
           </GoogleLogin>
          <div  @click="logInWithFacebook">
            <div class="imagefacebook-con" v-if="datafacebook">
              <img :src="imagefacebook" class="imagefacebook" /> {{datafacebook.name}} <div>เข้าสู่ระบบ</div>
            </div>
            <div v-else class="facebook">
               <i class="fab fa-facebook" style="font-size:20px"></i>  เข้าสู่ระบบด้วย Facebook
            </div>
          </div>
        </div>
        <div class="from">
          <div class="contor-input">
            <div class="title">ชื่อผู้ใช้ หรืออีเมล</div>
            <input type="text" v-model="dataLogin.username" class="input" />
          </div>
          <div class="contor-input">
            <div class="title">รหัสผ่าน</div>
            <input type="password" v-model="dataLogin.password" class="input" />
          </div>
          <div class="forget-password title">ลืมรหัสผ่าน</div>
          <button class="nv-btn-orange" @click="login">เข้าสู่ระบบ</button>
          <div class="aret">อีเมลหรือรหัสผ่าน ไม่ถูกต้อง</div>
        </div>
        <div class="register">
          ยังไม่ได้เป็นสมาชิก?
          <span class="link-register" @click="comResgister">สมัครสมาชิก</span>
        </div>
      </div>
      <div class="container-from register-from">
        <div class="text-login">สมัครสมาชิก</div>
        <div class="from">
          <div class="contor-input">
            <div class="title">อีเมล</div>
            <input type="text" class="input" />
          </div>
          <div class="contor-input">
            <div class="title">ชื่อผู้ใช้</div>
            <input type="text" class="input" />
          </div>
          <div class="contor-input">
            <div class="title">ชื่อ</div>
            <input type="text" class="input" />
          </div>
          <div class="contor-input">
            <div class="title">นามสกุล</div>
            <input type="text" class="input" />
          </div>
          <div class="contor-input">
            <div class="title">รหัสผ่าน</div>
            <input type="text" class="input" />
          </div>
          <div class="contor-input">
            <div class="title">ยืนยันรหัสผ่าน</div>
            <input type="text" class="input" />
          </div>
          <button class="nv-btn-orange" style="margin-top: 15px">
            สมัครสมาชิก
          </button>
        </div>
        <div class="register">
          เป็นสมาชิกแล้ว?
          <span class="link-register" @click="comlogin">เข้าสู่ระบบ</span>
        </div>
      </div>
    </div>
    
  </div>
  
</template>

<script lang="ts">
import Vue from "vue";
import { Auth, Gatway } from "../shares/services";
import { facebook_app_id } from "../shares/constants";
import GoogleLogin from "vue-google-login";
// import { alert } from '@/shares/modules/alert'


export default Vue.extend({
  name: "Login",
  components: {
    GoogleLogin,
  },
  data() {
    return {
      isLogin: false,
      onmouse: false,
      dataLogin: {
        username: "mayesterda2y.g@gmail.com",
        password: "123456789",
      },
      imagefacebook: localStorage.getItem("imagefacebook"),
      datafacebook: JSON.parse(localStorage.getItem("social_auth") as any),
      params: {
        client_id:
          "1002950262285-jft3s7uqb5n9adk5kn8140bn48edpasf.apps.googleusercontent.com",
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      },
    };
  },
  mounted() {

    this.initFacebook()
    let login = document.getElementsByClassName("login-crad")[0] as HTMLElement; 
    login.onmouseover = () => {
      this.onmouse = true;
    };
    login.onmouseout = () => {
      this.onmouse = false;
    };
    this.comlogin();
  },
  methods: {
    login() {
      Auth.login({
        usernameOrEmail: this.dataLogin.username,
        password: this.dataLogin.password,
      }).then((res) => {
        console.log(res.data.status.toString());
        let token = res.data.data.token;
        let status = res.data.status.toString();
        if (res.data.status === true) {
          this.$store.commit("login", { token, status });
        } else {
          const alert = document.getElementsByClassName("aret")[0] as HTMLElement;
          alert.style.transform = "scale(1.0)";
        }
      });
    },

    openlogin() {
      document
        .getElementsByClassName("login-crad")[0]
        .classList.add("login-crad-show");
      document.getElementsByClassName("login")[0].classList.add("show");
    },
    close() {
      document
        .getElementsByClassName("login-crad")[0]
        .classList.remove("login-crad-show");
      document.getElementsByClassName("login")[0].classList.remove("show");
    },
    comResgister() {
      let comResgister = document.getElementsByClassName("register-from")[0];
      let comLogin = document.getElementsByClassName("login-from")[0];
      comResgister.classList.add("show-com");
      comLogin.classList.remove("show-com");
    },
    comlogin() {
      let comResgister = document.getElementsByClassName("register-from")[0];
      let comLogin = document.getElementsByClassName("login-from")[0];
      comResgister.classList.remove("show-com");
      comLogin.classList.add("show-com");
    },
    onSuccess(googleUser:any) {
      // console.log('dfdf');
      console.log(JSON.stringify(googleUser));

      // This only gets the user information: id, name, imageUrl and email
      // console.log(JSON.stringify(googleUser.getBasicProfile()));
    },
    onFailure(googleUser){
      console.log('>>>',googleUser);
    },
    async logfacebook(response:any) {
      (window as any).FB.api(
        response.authResponse.userID,
        { fields: "name,email,picture,first_name,last_name" },
        (res:any) => {
          console.log(res);
          var login = {
            id: res.id,
            email: `${res.id}@facebook.com`,
            first_name: res.first_name,
            last_name: res.last_name,
            name: res.name,
          };
          console.log(res.picture.data.url);
          localStorage.setItem("imagefacebook", res.picture.data.url);
          localStorage.setItem("social_auth", JSON.stringify(login));
          Gatway.postService("/login-facebook", login as any).then((res:any) => {
            let token = res.data.data.token;
            let status = true;
            this.$store.commit("login", { token, status });
          });
        }
      );
    },
    async logInWithFacebook() {
      try{
        this.loadFacebookSDK(document, "script", "facebook-jssdk");
        await this.initFacebook();
        await (window as any).FB.login( async (response:any) => {
          if (response.authResponse) {
          await this.logfacebook(response);
          } else {
            console.log("close");
          }
        });
      }catch (error){
        // alert('โปรดลองอีกครั้งลองอีกครั้ง','success')
        console.log(error);
      }
      
      // return false;
    },
    async initFacebook() {
      try{
        (window as any).fbAsyncInit =  () => {
          (window as any).FB.init({
            // appId: "683954099579149",
            // cookie: false,
            // xfbml: true,
            appId  : facebook_app_id,
            status : false, // check login status
            cookie : false, // enable cookies to allow the server to access the session
            xfbml  : true ,
            version: "v13.0",
          });
        };
      }catch (error){
           console.log(error);
      }
      
    },

    async logingoogle() {
      // let res =  await Gatway.postService("/login-gmail", {} as any)
      // console.log(res);
      let res =  await (this as any).$gAuth.signIn() 
      console.log(res);
      
      // (this as any).$gAuth.signIn().then((res) => {
      //   console.log(res);
        
      // });
    },
    loadFacebookSDK(d:any, s:string, id:string) {
      var js,fjs = d.getElementsByTagName(s)[0];
      console.log(d.getElementById(id));
      
      if (!d.getElementById(id)) {
        // return;
        setTimeout(() => {
           this.logInWithFacebook()
        }, 500);
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/all.js";
      fjs.parentNode.insertBefore(js, fjs);
    }
  },
});
</script>

<style lang="scss" scoped>
.login {
  top: 0;
  left: 0;
  z-index: 3000;
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffffd5;
  // backdrop-filter: blur(20px);
  opacity: 0;
  transition: 0.3s;
  pointer-events: none;
}

.login-crad {
  transition: 0.3s;
  border-radius: 15px;
  background: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.265) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  // box-shadow: 20px 15px 15px 0 hsl(0deg 0% 39% / 30%);
  margin-top: -100px;
  // transform: scale(0.5);
}
.google,
.facebook {
  border-radius: 50px;
  // text-align: center;
  padding: 8px 0px;
  border: 1px solid;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 10px;
  cursor: pointer;
}
.google {
  border: 2px solid cornflowerblue;
}
.facebook {
  border: 2px solid cornflowerblue;
  background: cornflowerblue;
  position: relative;
  color: #fff;
}
.container-from {
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.center {
  text-align: center;
  //   padding: 10px;
}
.socail {
  display: grid;
  grid-gap: 10px;
  margin-bottom: 20px;
}
.input:focus-visible {
  outline: none;
}
.forget-password {
  text-align: right;
}
.from {
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
}
.title {
  color: #444349;
  font-size: 13px;
}
.input {
  border: 2px solid #dadada;
  border-radius: 7px;
  width: 330px;
  padding: 10px;
}
.contor-input {
  display: grid;
  grid-gap: 3px;
}

.register {
  display: flex;
  justify-content: center;
  font-size: 13px;
  align-items: center;
  grid-gap: 7px;
  margin-top:15px;
}

.login-crad-show {
  margin-top: 0px;
  // transform: scale(1.0);
}
.aret {
  color: #ff6060;
  font-size: 13px;
  transform: scale(0);
  transition: 0.1s;
  height: 13px;
}

.show {
  opacity: 10;
  pointer-events: auto;
}
.text-login {
  color: #444349;
  font-size: 22px;
}
.login-img {
  display: flex;
  align-items: center;
  justify-content: center;
}
.link-register {
  cursor: pointer;
  color: #8359ff;
}
.register-from,
.login-from {
  display: none;
}

.show-com {
  display: flex;
}
.imagefacebook {
  border-radius: 50%;
  // right: 2px;
  width: 30px;
  // position: absolute;
}
.imagefacebook-con{
  display: flex;
  // position: absolute;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 200px;
  background: cornflowerblue;
  border: 2px solid cornflowerblue;
  font-size: 13px;
  color: #fff;
  width: 100%;
      padding: 2px 0px;
}
.imagefacebook-con:hover{
  border: 2px solid #a3bff4;
background: rgba(100, 148, 237, 0.595);
}
@media (max-width: 1024px) {
  .login-crad {
    margin: 0px 10px;
  }
}
@media (max-width: 768px) {
  .login-crad {
    transition: 0.3s;
    border-radius: 10px;
    height: 470px;
    background: #fff;
    display: grid;
    grid-template-columns: 1fr;
  }
  .login-img {
    display: none;
  }
}
@media (max-width: 415px) {
  .login-crad {
    transition: 0.3s;
    border-radius: 10px;
    width: 100%;
    background: #fff;
    display: grid;
    grid-template-columns: 1fr;
  }
  .login-crad {
    margin: 0px 0px;
  }
  .login-img {
    display: none;
  }
  .input {
    width: auto;
  }
  .login-crad {
    margin: 0px 10px;
    transform: scale(0.5);
  }
  .login-crad-show {
    margin-top: 0px;
    transform: scale(1);
  }
}
</style>
