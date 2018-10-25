<template>
    <div>
        <div class="page-container">
            <CategoryView
                :selectedCateId="selectedCateId"
                :categoryArr="categoryArr" 
                @categoryClicked="categoryClicked"></CategoryView>
            <JobCell v-for="jobModel in jobArr" :jobModel="jobModel" :key="jobModel.id"></JobCell>
        </div>
        <Footer :selectedTab="0" @tabClicked="tabClicked"></Footer>
    </div>
</template>

<script>
import CategoryView from '../home/CategoryView.vue'
import Footer from '../common/Footer.vue';
import JobCell from '../home/JobCell.vue';

export default {
    data() {
        return {
            jobArr: [],
            categoryArr: [],
            selectedCateId: null
        };
    },
    methods: {
        tabClicked(tabIndex) {
            if (tabIndex === 1) {
                this.$router.push("profile");
            }
        },
        uploadData() {
            let params = {zhinengId: this.selectedCateId || 0};
            this.$http.get('/v1/jobs/wecash', {params: params}).then(
                res => {
                    this.jobArr = res.data.data.jobs;
                }
            );
            this.$http.get('/v1/jobs-groupedby-zhineng/wecash').then(
                res => {
                    this.categoryArr = res.data.data.jobs;
                    if (!this.selectedCateId && this.categoryArr.length >= 1) {
                        this.selectedCateId = this.categoryArr[0].id;
                    }
                    for (let cate of this.categoryArr) {
                        if (!cate.id) {
                            cate.id = "others";
                        }
                    }
                }
            );
        },
        categoryClicked(category) {
            if (this.selectedCateId != category.id) {
                this.selectedCateId = category.id;
                this.uploadData();
            }
        }
    },
    components: {
        CategoryView,
        Footer,
        JobCell,
    },
    mounted: function() {
        if (!this.jobArr.length) {
            this.uploadData();
        }
    }
};
</script>

<style scoped>
.page-container {
    margin-bottom: 49px;
}
</style>
