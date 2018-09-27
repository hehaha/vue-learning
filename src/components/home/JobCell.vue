<template>
    <div class="cell-container">
        <div class="job-image">
        </div>
        <div class="info-container">
            <div class="job-name">
                <span>{{ jobModel.title }}</span>
            </div>
            <div class="job-info">
                <div class="location text-content">
                    <div></div>
                    <span v-if="jobModel.locations && jobModel.locations[0]">{{ jobModel.locations[0].province }}</span>
                    <span v-else></span>
                </div>
                <div class="salary text-content">
                    <div></div>
                    <span>{{ jobModel.minSalary }}k-{{ jobModel.maxSalary }}k</span>
                </div>
            </div>
            <div class="job-desc text-content">
                <span>{{ desc }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["jobModel"],
    computed: {
        desc() {
            let desc = this.jobModel.description || '';
            desc = desc.replace(/<\/?\w+>/g, '');
            return desc;
        }
    }
};
</script>

<style scoped>
.job-image {
    float: left;
    height: 140px;
    width: 140px;
    margin: 24px 0 0 15px;
    background-image: url("../../assets/未标题-1@2x.png");
    background-size: contain;
}
.info-container {
    height: 140px;
    margin: 24px 15px 0 164px;
}
.cell-container {
    overflow: auto;
}
.job-name span {
    display: inline-block;
    height: 25px;
    max-width: 100%;
    font-size: 18px;
    color: #323232;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.job-info span {
    font-size: 12px;
    color: #828282;
}
.job-info .text-content {
    display: inline-block;
}
.job-desc span {
    display: inline-block;
    width: 100%;
    height: 82px;
    font-size: 12px;
    color: #323232;
    text-overflow: ellipsis;
    overflow: hidden;
}
.salary {
    margin-left: 17px;
}
</style>

