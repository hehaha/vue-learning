<template>
    <div class="page-container">
        <section class="section-container">
            <ResumeCell :title="'开始时间'" :placeholder="'请选择'" :val.sync="practiceInfo.start"></ResumeCell>
            <ResumeCell :title="'结束时间'" :placeholder="'请选择'" :val.sync="practiceInfo.end"></ResumeCell>
            <ResumeCell :title="'企业名称'" :placeholder="'未填写'" :val.sync="practiceInfo.company"></ResumeCell>
            <ResumeCell :title="'所在部门'" :placeholder="'未填写'" :val.sync="practiceInfo.department"></ResumeCell>
            <ResumeCell :title="'职位名称'" :placeholder="'未填写'" :val.sync="practiceInfo.title"></ResumeCell>
        </section>
        <section class="btn-container" @click="save">
            <div class="save-btn">
                <span>保存</span>
            </div>
        </section>
    </div>
</template>

<script>
import ResumeCell from './ResumeCell.vue';
import { ADD_PRACTICE, UPDATE_PRACTICE } from '../../store/Store';

export default {
    data() {
        return {
            practiceInfo: {start: '', end: '', company: '', department: '', title: '', desc: ''},
            action: ADD_PRACTICE,
        };
    },
    methods: {
        save() {
            if (!(this.practiceInfo.start && this.practiceInfo.end && this.practiceInfo.company &&
                this.practiceInfo.department && this.practiceInfo.title)) {
                alert('请填写完整的信息!');
                return;
            }
            if (this.practiceInfo.id) {
                this.$store.commit('profile/' + UPDATE_PRACTICE, this.practiceInfo);
            }
            else {
                this.$store.commit('profile/' + ADD_PRACTICE, this.practiceInfo);
            }
            this.$router.go(-1);
        }
    },
    components: {
        ResumeCell
    },
    mounted: function() {
        let practiceInfo = this.$route.params.practiceInfo;
        if (practiceInfo && Object.keys(practiceInfo).length > 0) {
            this.action = UPDATE_PRACTICE;
            this.practiceInfo = practiceInfo;
        }
        else {
            this.action = ADD_PRACTICE;
        }
    }
}
</script>

<style scoped>
.page-container {
    margin: 0 15px;
}
.section-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 15px;
    background: #ffffff;
    box-shadow: 0 2px 60px 0 rgba(15,15,60,0.12);
    border-radius: 12px;
}
.btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    margin-top: 15px;
    box-shadow: 0 6px 30px 0 rgba(15,15,60,0.36);
    border-radius: 100px;
    color: #ffffff;
    background-color: #3250ff;
}
</style>
