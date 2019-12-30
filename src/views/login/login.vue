<template>
  <section class="loginContainer">
    <div class="loginInner">
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
      <div class="login_header">
        <h2 class="login_logo">vue外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button class="get_verification" :class="{right_phone:!getCodeDisabled}" :disabled="getCodeDisabled"
                      @click.prevent="getCode">
                {{countTime? `已发送(${countTime}s)` : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册vue外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd"/>
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd"/>
                <div class="switch_button" :class="showPwd? 'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd? 'ABC' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" @click="getCaptcha" alt="captcha"
                     ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
    </div>
    <alerttip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script>
import alerttip from '../../components/alerttip/alerttip'
import { reqPwdLogin, reqSendCode, reqSmsLogin } from '../../api'

export default {
  name: 'login',
  data () {
    return {
      loginWay: true, // true 代表短信登录
      phone: '',
      countTime: 0,
      showPwd: false,
      alertText: '', // 弹窗tip文本
      alertShow: false, // 是否显示弹窗
      code: '', // 短信验证码
      name: '', // 用户名
      captcha: '', // 一次性验证码
      pwd: '' // 密码
    }
  },
  computed: {
    rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    },
    rightCode () {
      return /^\d{6}$/.test(this.code)
    },
    getCodeDisabled () {
      if (this.countTime > 0 || !this.rightPhone) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    },
    closeTip () {
      this.alertShow = false
      this.alertText = ''
    },
    showTip (alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    async getCode () {
      if (!this.countTime) {
        this.countTime = 30
        this.timer = setInterval(() => {
          this.countTime--
          if (this.countTime <= 0) {
            clearInterval(this.timer)
          }
        }, 1000)
      }
      const result = await reqSendCode(this.phone)
      if (result.code === 1) {
        this.showTip(result.msg)
        if (this.timer) {
          clearInterval(this.timer)
          this.countTime = undefined
        }
      }
    },
    async login () {
      let result
      if (this.loginWay) {
        if (!this.rightPhone) {
          this.showTip('请输入正确的电话号码')
        } else if (!this.rightCode) {
          this.showTip('请输入正确的验证码')
        }
        // 发送短信验证码登录的ajax请求
        result = await reqSmsLogin(this.phone, this.code)
      } else {
        const { name, pwd, captcha } = this
        if (!name) {
          this.showTip('请输入用户名')
        } else if (!pwd) {
          this.showTip('请输入密码')
        } else if (!captcha) {
          this.showTip('请输入验证码')
        }
        // 发送用户名密码登录的ajax请求
        result = await reqPwdLogin({ name, pwd, captcha })
      }
      // 清除计时器
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = undefined
        this.countTime = undefined
      }
      if (result.code === 0) {
        this.$store.dispatch('saveUserInfo', result.data)
        console.log('保存的用户信息:', result.data)
        this.$router.push('/profile')
      } else {
        this.showTip(result.msg)
        if (!this.loginWay) {
          this.getCaptcha()
        }
      }
    }
  },
  components: {
    alerttip
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/mixins/mixins.less";

  .loginContainer {
    width: 100%;
    height: 100%;
    background: #fff;
    .loginInner {
      padding-top: 60px;
      width: 80%;
      margin: 0 auto;
      .login_header {
        .login_logo {
          font-size: 40px;
          font-weight: bold;
          color: @green;
          text-align: center;
        }
        .login_header_title {
          padding-top: 40px;
          text-align: center;
          > a {
            color: #333;
            font-size: 14px;
            padding-bottom: 4px;
            &:first-child {
              margin-right: 40px;
            }
            &.on {
              color: @green;
              font-weight: 700;
              border-bottom: 2px solid @green;
            }
          }
        }
      }
      .login_content {
        > form {
          > div {
            display: none;
            &.on {
              display: block;
            }
            input {
              width: 100%;
              height: 100%;
              padding-left: 10px;
              box-sizing: border-box;
              border: 1px solid #ddd;
              border-radius: 4px;
              outline: 0;
              font: 400 14px Arial;
              &:focus {
                border: 1px solid @green;
              }
            }
            .login_message {
              position: relative;
              margin-top: 16px;
              height: 48px;
              font-size: 14px;
              background: #fff;
              .get_verification {
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                border: 0;
                color: #ccc;
                font-size: 14px;
                background: transparent;
                &.right_phone {
                  color: black;
                }
              }
            }
            .login_verification {
              position: relative;
              margin-top: 16px;
              height: 48px;
              font-size: 14px;
              background: #fff;
              .switch_button {
                font-size: 12px;
                border: 1px solid #ddd;
                border-radius: 8px;
                transition: background-color .3s, border-color .3s;
                padding: 0 6px;
                width: 30px;
                height: 16px;
                line-height: 16px;
                color: #fff;
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                &.off {
                  background: #fff;
                }
                &.on {
                  background: @green;
                }
                > .switch_circle {
                  position: absolute;
                  top: -1px;
                  left: -1px;
                  width: 16px;
                  height: 16px;
                  border: 1px solid #ddd;
                  border-radius: 50%;
                  background: #fff;
                  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
                  transition: transform .3s;
                  &.right {
                    transform: translateX(30px);
                  }
                }
              }
            }
            .login_hint {
              margin-top: 12px;
              color: #999;
              font-size: 14px;
              line-height: 20px;
              > a {
                color: @green;
              }
            }
          }
          .login_submit {
            display: block;
            width: 100%;
            height: 42px;
            margin-top: 30px;
            border-radius: 4px;
            background: #4cd96f;
            color: #fff;
            text-align: center;
            font-size: 16px;
            line-height: 42px;
            border: 0;
          }
        }
        .about_us {
          display: block;
          font-size: 12px;
          margin-top: 20px;
          text-align: center;
          color: #999;
        }
      }
      .go_back {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 30px;
        height: 30px;
        > .iconfont {
          font-size: 20px;
          color: #999;
        }
      }
    }
  }
</style>
