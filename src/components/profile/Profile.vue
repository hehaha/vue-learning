<template>
    <div>
        <div class="page-container">
            <div id="profile"></div>
            <div v-if="isLogin" id="profile-container">
                <ProfileCell :title="'邀请得红包'" @clicked="profileCellClicked"></ProfileCell>
                <ProfileCell :title="'我的简历'" @clicked="profileCellClicked"></ProfileCell>
                <ProfileCell :title="'公司介绍'" @clicked="profileCellClicked"></ProfileCell>
            </div>
            <div v-else id="login-container">
                <LoginInput 
                    :title="MOBILE_TITLE"
                    :btnShow="true"
                    :btnText="'获取验证码'"
                    :isTop="true"
                    @btnClicked="getVerifyCode"
                    @contentUpdate="inputUpdate"></LoginInput>
                <LoginInput 
                    :title="VERIFYCODE_TITLE" 
                    :btnShow="false"
                    @contentUpdate="inputUpdate"></LoginInput>
                <div id="submit-container">
                    <div id="submit-div" @click="login">
                        <span id="submit-span">登录</span>
                    </div>
                </div>
            </div>
        </div>
        <Footer :selectedTab="1" @tabClicked="tabClicked"></Footer>
    </div>
</template>

<script>
import LoginInput from './LoginInput.vue';
import ProfileCell from './ProfileCell.vue';
import Footer from '../common/Footer.vue';
import {getCookie, setCookie} from '../../utils/utils.js';

const MOBILE_TITLE = '手机号';
const VERIFYCODE_TITLE = '短信验证码';

export default {
    data() {
        return {
            MOBILE_TITLE: MOBILE_TITLE,
            VERIFYCODE_TITLE: VERIFYCODE_TITLE,
            mobile: "",
            verifyCode: "",
        }

    },
    computed: {
        isLogin() {
            let session = getCookie('isLogin');
            return Boolean(session);
        }
    },
    name: 'app',
    methods: {
        getVerifyCode() {
            if (this.mobile.length === 0) {
                return;
            }
            let form = new FormData();
            form.append('mobile', this.mobile);
            this.$http.post(
                '/api/account/login/code', form
            ).then(
                res => {
                    if (res.body.errorNo === 1) {
                        this.verifyCode = res.body.data.code;
                    }
                    else {
                        window.console.log(res.body);
                    }
                }
            );
        },
        inputUpdate(clickedInput, val) {
            switch (clickedInput.title) {
                case MOBILE_TITLE:
                    this.mobile = val;
                    break;
                case VERIFYCODE_TITLE:
                    this.verifyCode = val;
                    break;
                default:
                    break
            }
        },
        login() {
            let form = new FormData();
            form.append("mobile", this.mobile);
            form.append("code", this.verifyCode);
            this.$http.post(
                '/api/account/login', form
            ).then(
                res => {
                    window.console.log(res);
                    setCookie('isLogin', 1, 90 * 86400);
                    // force refresh
                    this.$router.go(0);
                }
            );
        },
        profileCellClicked(cell) {
            return cell;
        },
        tabClicked(tabIndex) {
            if (tabIndex === 0) {
                this.$router.push("home");
            }
        }
    },
    components: {
        LoginInput,
        ProfileCell,
        Footer,
    }
}
</script>

<style scoped>
.page-container {
    margin: 0 15px;
}
#profile {
    height: 0;
    background-image: url("../../assets/Rectangle 4@2x.png");
    background-size: contain;
    background-repeat: no-repeat;
    padding-top: 46.38%;
}
#login-container {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 60px 0 rgba(15,15,60,0.12);
}
#submit-container {
    padding: 33px 15px 30px;
}
#submit-div {
    background-color: #3250ff;
    border-radius: 6px;
    height: 45px;
    text-align: center;
}
#submit-span {
    color: #ffffff;
    padding-top: 12px;
    display: block;
}
</style>
