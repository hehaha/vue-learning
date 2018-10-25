<template>
    <div class="page-container">
        <section class="section-container basic-info">
            <ResumeCell :title="'姓名'" :val.sync="basicInfo.name" :placeholder="'未填写'"></ResumeCell>
            <ResumeCell :title="'性别'" :val.sync="sexText" :placeholder="'请选择'"></ResumeCell>
            <ResumeCell :title="'年龄'" :val.sync="basicInfo.age" :placeholder="'未填写'"></ResumeCell>
            <ResumeCell :title="'手机号'" :val.sync="basicInfo.mobile" :placeholder="'188 8888 8888'"></ResumeCell>
            <ResumeCell :title="'电子邮箱'" :val.sync="basicInfo.email" :placeholder="'未填写'"></ResumeCell>
        </section>
        <section class="section-container education-info">
            <ResumeCell :title="'最高学历'" :val.sync="educationInfo.degree" :placeholder="'请选择'"></ResumeCell>
            <ResumeCell :title="'学校'" :val.sync="educationInfo.school" :placeholder="'未填写'"></ResumeCell>
            <ResumeCell :title="'专业'" :val.sync="educationInfo.majority" :placeholder="'未填写'"></ResumeCell>
            <ResumeCell :title="'入学时间'" :val.sync="educationInfo.start" :placeholder="'请选择'"></ResumeCell>
        </section>
        <section class="section-container practice-info" v-for="practice in practices" :key="practice.id">
            <PracticeCell :model="practice" @editBtnClicked="editPracticeInfo" @delBtnClicked="delPracticeInfo"></PracticeCell>
        </section>
        <section class="section-container experience-addition" @click="addPractice">
            <div class="text-item">
                <span>+ 添加工作经历</span>
            </div>
        </section>
        <section class="section-container self-desc">
            <textarea v-model="desc" :placeholder="'简单介绍下你自己吧...(可选)'"></textarea>
        </section>
        <section class="section-container job-intention">
            <ResumeCell :title="'求职意向'" :val.sync="jobIntention.category" :placeholder="'未填写'"></ResumeCell>
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
import PracticeCell from './PracticeCell.vue';
import Vue from 'vue';
import { mapState } from 'vuex';
import { ADD_PRACTICE, DELETE_PRACTICE } from '../../store/Store';

export default {
    components: {
        ResumeCell,
        PracticeCell,
    },
    computed: {
        sexText: {
            get: function() { 
                if (this.basicInfo.sex === 1) {
                    return '男';
                }
                else if(this.basicInfo.sex === 2) {
                    return '女';
                }
                return '未知';
            },
            set: function(val) {
                if (val === '男') {
                    this.basicInfo.sex = 1;
                }
                else if (val === '女') {
                    this.basicInfo.sex = 2;
                }
                else {
                    this.basicInfo.sex = 0;
                }
            }
        },
        ...mapState({practices: state => state.profile.practices}),
    },
    data() {
        return {
            basicInfo: {name: ''},
            educationInfo: {},
            jobIntention: {},
            desc: ''
        };
    },
    methods: {
        addPractice() {
            this.$router.push({name: 'ProfilePractice', params: {practiceInfo: {}}});
        },
        save() {
            let params = {
                basic_info: this.basicInfo,
                education_info: this.educationInfo,
                job_intention: this.jobIntention,
                practice_info: this.practices,
            };
            Vue.http.options.emulateJSON = false;
            this.$http.post('/api/resume/detail', params).then(
                res => {
                    let message = res.body.errorNo === 1 ? '保存成功' : '保存失败';
                    alert(message);
                }
            );
            Vue.http.options.emulateJSON = true;
        },
        uploadData() {
            this.$http.get('/api/resume/detail').then(
                res => {
                    this.basicInfo = res.data.data.basic_info;
                    this.educationInfo = res.data.data.education_info;
                    this.jobIntention = res.data.data.job_intention;
                    for (const practice of res.data.data.practice_info) {
                        this.$store.commit(ADD_PRACTICE, practice);
                    }
                }
            );
        },
        editPracticeInfo(practice) {
            this.$router.push({name: 'ProfilePractice', params: {practiceInfo: practice}});
        },
        delPracticeInfo(practice) {
            this.$store.commit('profile/' + DELETE_PRACTICE, practice.id);
        }
    },
    mounted: function() {
        this.uploadData();
    }
};
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
.experience-addition {
    align-items: center;
    justify-content: center;
    height: 60px;
}
.self-desc {
    height: 135px;
}
.self-desc textarea {
    font-size: 18px;
    width: 100%;
    margin: 20px 15px;
}
.self-desc textarea:focus {
    outline: none;
    border: none;
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
.text-item {
    color: #3250ff;
}
</style>
