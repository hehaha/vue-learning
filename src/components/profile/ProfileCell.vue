<template>
    <div class="row-container" @click="click">
        <div :class="cellClass">
            <div class="icon">
            </div>
            <div class="title">
                <span>{{ title }}</span>
            </div>
            <div class="tail">
            </div>
        </div>
        <div class="seperator"></div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        isTop: {
            type: Boolean,
            default: false
        }
    },
    computed:{
        cellClass() {
            return this.isTop ? "top-cell" : "profile-cell";
        }
    },
    methods: {
        click() {
            this.$emit("clicked", this);
        }
    }
}
</script>

<style scoped>
.row-container {
    overflow: auto;
}
.profile-cell {
    width: auto;
    margin: 32px 0 0 3px;
}
.top-cell {
    width: 100%;
    margin: 39.5px 0 0 3px;
}
.icon {
    height: 15px;
    width: 12.5px;
    background-color: #b9becd;
    display: inline-block;
    vertical-align: middle;
}
.title {
    margin-left: 9px;
    font-size: 15px;
    color: #323232;
    display: inline;
}
.tail {
    background-image: url("../../assets/跳转 copy 2@2x.png");
    height: 16px;
    width: 16px;
    background-size: contain;
    float: right;
}
.seperator {
    margin: 16.5px 0 0;
    height: 1px;
    background-color: #f5f4f7;
}
</style>
