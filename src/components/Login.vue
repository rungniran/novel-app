<template>
  <div class="login" @click="onmouse == false ? close() : null">
    <div class="login-crad">
      <div class="login-img">
        <img v-lazy="$path.image('25.png')" />
      </div>
      <div class="container-from login-from">
        <div class="socail">
          <div class="center text-login">เข้าสู่ระบบ</div>

          <div class="google" @click="logingoogle()">
            <img src="../assets/images/image 5.png" width="18px" />
            เข้าสู่ระบบด้วย Google
          </div>
          <div @click="logInWithFacebook">
            <!-- <div class="imagefacebook-con" v-if="datafacebook">
              <img :src="imagefacebook" class="imagefacebook" />
              <span>{{datafacebook.first_name}} {{datafacebook.last_name}}</span>
              <div>เข้าสู่ระบบ</div>
            </div> -->
            <div class="facebook">
              <i class="fab fa-facebook" style="font-size: 20px"></i>
              เข้าสู่ระบบด้วย Facebook
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
            <input
              type="email"
              class="input"
              id="email"
              v-model="resgister.email"
            />
          </div>
          <div class="contor-input">
            <div class="title">ชื่อผู้ใช้</div>
            <input
              type="text"
              class="input"
              id="username"
              v-model="resgister.username"
            />
          </div>
          <div class="contor-input">
            <div class="title">ชื่อ</div>
            <input
              type="text"
              class="input"
              id="first_name"
              v-model="resgister.first_name"
            />
          </div>
          <div class="contor-input">
            <div class="title">นามสกุล</div>
            <input
              type="text"
              class="input"
              id="last_name"
              v-model="resgister.last_name"
            />
          </div>
          <div class="contor-input">
            <div class="title">รหัสผ่าน</div>
            <input
              type="password"
              class="input"
              v-model="resgister.password"
              placeholder="รหัสผ่านต้องมากกว่า 8 ตัว"
            />
          </div>
          <div class="contor-input">
            <div class="title">ยืนยันรหัสผ่าน</div>
            <input
              type="password"
              class="input"
              v-model="resgister.password_confirmation"
            />
          </div>
          <button
            class="nv-btn-orange"
            style="margin-top: 15px"
            @click="resgisteCostomer()"
          >
            <svg
              v-if="isLoading"
              version="1.1"
              id="loader-1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="25px"
              height="25px"
              viewBox="0 0 50 50"
              style="enable-background: new 0 0 50 50"
              xml:space="preserve"
            >
              <path
                :fill="color"
                d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
              >
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
            <div v-else>สมัครสมาชิก</div>
          </button>
        </div>
        <div class="register">
          เป็นสมาชิกแล้ว?
          <span class="link-register" @click="comlogin">เข้าสู่ระบบ</span>
        </div>
      </div>
    </div>
    <NovelModal2
      ID="emailConfirm"
      IDCrad="emailConfirmCard"
      ref="emailConfirm"
      :Close="true"
    >
      <template v-slot:body>
        <div>
          <figure class="img-dragon">
            <img class="img-no-data" src="../assets/images/dragon/11.png" />
          </figure>
          <p style="text-align: center">
            การสมัครของคุณสำเร็จโปรดยืนยันตัวตนใน email
          </p>
          <div class="layout-iconcheck">
            <i class="fa fa-check-circle icon-check" aria-hidden="true"></i>
          </div>
        </div>
      </template>
    </NovelModal2>
  </div>
</template>

<script>
import Vue from "vue";
import { Auth, Gatway } from "../shares/services";
// import { facebook_app_id } from "../shares/constants";
import { Validation } from "@/shares/modules/validation";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { alert } from "@/shares/modules/alert";

export default Vue.extend({
  name: "Login",
  components: {
    NovelModal2: () => import("./widget/NovelModal2.vue"),
  },
  data() {
    return {
      isLogin: false,
      onmouse: false,
      dataLogin: {
        username: "",
        password: "",
      },
      resgister: {
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirmation: "",
      },
      isLoading: false,
      // imagefacebook: localStorage.getItem("imagefacebook"),
      // datafacebook: JSON.parse(localStorage.getItem("social_auth")),
    };
  },
  mounted() {
    let login = document.getElementsByClassName("login-crad")[0];
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
          const alert = document.getElementsByClassName("aret")[0];
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
    async resgisteCostomer() {
      let array = ["email", "username", "first_name", "last_name"];
      if (Validation(array) === true) {
        if (this.resgister.password.length < 8) {
          alert("รหัสผ่านต้องมากกว่า 8 ตัว", "error");
        } else {
          if (
            this.resgister.password !== this.resgister.password_confirmation
          ) {
            alert("รหัสผ่านไม่ตรงกัน", "error");
          } else {
            this.isLoading = true;
            const res = await Gatway.postService("/register", this.resgister);
            console.log(res.data);
            if (res.data.code === 422) {
              // console.log('----');
              res.data.data.email !== undefined
                ? alert("email นี้ถูกใช้ไปแล้ว", "error")
                : null;
              res.data.data.username !== undefined
                ? alert("username นี้ถูกใช้ไปแล้ว", "error")
                : null;
            } else {
              this.$refs.emailConfirm.open();
              this.isLoading = false;
            }
          }
        }
      }
      // let data = {
      //   password:this.resgister.password,
      //   password_confirmation: this.resgister.password_confirmation
      // }
      // let resPassword = await Gatway.postService('/customers/user-info/change-password', this.resgister)
      // console.log(resPassword);
    },

    async logInWithFacebook() {
      const provider = new FacebookAuthProvider();
      try {
        const res = await signInWithPopup(getAuth(), provider);
        console.log(
          res.user.providerData[0].email,
          res.user.providerData[0].uid
        );
        let email = res.user.providerData[0].email
          ? res.user.providerData[0].email
          : `${res.user.providerData[0].uid}@facebook.com`;
        var login = {
          id: res.user.providerData[0].uid,
          email: email,
          first_name: res._tokenResponse.firstName
            ? res._tokenResponse.firstName
            : "-",
          last_name: res._tokenResponse.lastName
            ? res._tokenResponse.lastName
            : "-",
          name: email,
        };
        // console.log(login);
        this.CleckEmail(login);
      } catch (error) {
        // alert('Email ถูกใช้งานไปแล้วใน บัญชี ' + error.customData._tokenResponse.verifiedProvider[0],"success")
        console.log(error);
        console.log(JSON.parse(error.customData._tokenResponse.rawUserInfo).id);
        var loginErr = {
          id: JSON.parse(error.customData._tokenResponse.rawUserInfo).id,
          email: error.customData.email,
          first_name: error.customData._tokenResponse.firstName
            ? error.customData._tokenResponse.firstName
            : "-",
          last_name: error.customData._tokenResponse.lastName
            ? error.customData._tokenResponse.firstName
            : "-",
          name: error.customData.email,
        };
        console.log(loginErr);
        // //   localStorage.setItem("social_auth",JSON.parse(error.customData._tokenResponse.rawUserInfo));
        // // localStorage.setItem("imagefacebook", error.customData._tokenResponse.photoUrl);
        this.CleckEmail(loginErr);
      }
    },
    async CleckEmail(item) {
      const resfacebook = await Gatway.postService("/login-facebook", item);
      let token = resfacebook.data.data.token;
      let status = true;
      this.$store.commit("login", { token, status });
    },

    async logingoogle() {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const res = await signInWithPopup(getAuth(), provider);
      const data = {
        ...res.user.providerData[0],
        first_name: res._tokenResponse.firstName
          ? res._tokenResponse.firstName
          : "-",
        last_name: res._tokenResponse.lastName
          ? res._tokenResponse.lastName
          : "-",
      };
      const resgmail = await Gatway.postService("/login-gmail", data);
      let token = resgmail.data.data.token;
      let status = true;
      this.$store.commit("login", { token, status });
    },
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
figure {
  width: intrinsic;
}
.layout-iconcheck {
  display: flex;
  justify-content: center;
}
.icon-check {
  color: green;
  font-size: 30px;
}
img.img-no-data {
  width: 130px;
  height: 120px;
  object-fit: cover;
  padding-bottom: 10px;
}
.img-dragon {
  // widows: fit-content;
  display: flex;
  justify-content: center;
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
  margin-top: 15px;
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
.imagefacebook-con {
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
.imagefacebook-con:hover {
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
