<template>
    <div>
        <div class="page-container">
        </div>
        <Footer :selectedTab="0" @tabClicked="tabClicked"></Footer>
    </div>
</template>

<script>
import Footer from '../common/Footer.vue';

export default {
    data() {
        return {jobArr: []};
    },
    methods: {
        tabClicked(tabIndex) {
            if (tabIndex === 1) {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("profile");
            }
        },
        uploadData() {
            this.$http.get('/v1/jobs/wecash').then(
                res => {
                    this.jobArr = res.data.data.jobs;
                }
            );
        }
    },
    components: {
        Footer,
    },
    mounted: function() {
        if (!this.jobArr.length) {
            this.uploadData();
        }
    }
};
</script>

<style>
</style>
