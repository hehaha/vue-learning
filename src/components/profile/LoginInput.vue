<template>
    <div class="row-container">
        <div :class="inputClass">
            <div class="input-components">
                <div class="title">
                    <span>{{ title }}</span>
                </div>
                <div v-if="btnShow" class="operation-btn" @click="click">
                    <span class="btn-span">{{ btnText }}</span>
                </div>
                <div class="content-input">
                    <input v-model.trim="content" />
                </div>
            </div>
            <div class="seperator"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        btnShow: {
            type: Boolean,
            default: true
        },
        btnText: {
            type: String,
            default: ''
        },
        isTop: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {content: ''};
    },
    computed:{
        inputClass() {
            return this.isTop ? "top-input" : "login-input";
        }
    },
    watch: {
        content(val) {
            this.$emit("contentUpdate", this, val);
        }
    },
    methods: {
        click() {
            this.$emit("btnClicked");
        }
    }
}
</script>

<style scoped>
.login-input {
    padding: 36.5px 15px 0;
}
.top-input {
    padding: 24px 15px 0;
}
.title {
    color: #b4b4b4;
    font-size: 18px;
    float: left;
}
.operation-btn {
    width: 90px;
    height: 30px;
    background-color: #f5f4f7;
    float: right;
    border-radius: 50px;
    text-align: center;
}
.seperator {
    margin: 9.5px 0 0;
    height: 1px;
    background-color: #f5f4f7;
}
.content-input {
    width: auto;
    overflow: hidden;
}
.content-input input {
    border: none;
    font-size: 18px;
    width: 100%;
}
.content-input input:focus {
    outline: none;
    border: none;
}
.input-components {
    display: inline-block;
    width: 100%;
}
.btn-span {
    color: #3250ff;
    font-size: 12px;
    display: block;
    margin-top: 7px;
}
</style>
