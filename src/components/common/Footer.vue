<template>
    <div id="footer">
        <div class="top-border"></div>
        <div id="tab1" @click="tabClicked(0)">
            <div :class="getTabClass(0)"></div>
        </div>
        <div id="tab2" @click="tabClicked(1)">
            <div :class="getTabClass(1)"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selectedTab: {
            type: Number,
            default: -1
        }
    },
    methods: {
        getTabClass(index) {
            return this.selectedTab === index ? "tab-icon tab-icon-selected" : "tab-icon";
        },
        tabClicked(index) {
            this.$emit("tabClicked", index);
        }
    },
};
</script>

<style>
#footer {
    position: absolute;
    bottom: 0;
    height: 49px;
    width: 100%;
}
.top-border {
    width: 100%;
    height: 0.5px;
    background: #dcdcdc;
}
#tab1 {
    display: inline-block;
    height: 100%;
    width: 50%;
}
#tab2 {
    display: inline-block;
    height: 100%;
    width: 50%;
}
.tab-icon {
    margin: 12px auto 0;
    height: 25px;
    width: 25px;
    background-size: contain;
    background-image: url("../../assets/icon_主页 copy 2@2x.png");
}
.tab-icon-selected {
    background-image: url("../../assets/icon_主页 copy@2x.png");
}
</style>
