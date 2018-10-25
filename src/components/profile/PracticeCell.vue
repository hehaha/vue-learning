<template>
    <div class="practice-cell">
        <div class="row">
            <div class="cell-title">
                <span>{{ model.title }}</span>
            </div>
            <div class="btn btn-edit" @click="editBtnClicked">
                <span>编辑</span>
            </div>
            <div class="btn btn-delete" @click="delBtnClicked">
                <span>删除</span>
            </div>
        </div>
        <div class="info cell-department">
            <span>{{ model.department }}</span>
        </div>
        <div class="info cell-period">
            <span>{{ model.start }}-{{ model.end }}</span>
        </div>
        <div class="info cell-desc">
        </div>
    </div>
</template>

<script>
export default {
    props: ["model"],
    methods: {
        editBtnClicked() {
            this.$emit("editBtnClicked", this.model);
        },
        delBtnClicked() {
            this.$emit("delBtnClicked", this.model);
        }
    }
};
</script>

<style scoped>
.practice-cell {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.row {
    display: flex;
    flex-direction: row;
    margin: 25px 15px 0 15px;
}
.cell-title {
    flex-grow: 2;
    font-size: 18px;
}
.info {
    margin: 15px 0 0 15px;
    font-size: 12px;
    color: #b4b4b4;
}
.btn {
    display: flex;
    font-size: 12px;
}
.btn-edit {
    margin-right: 15px;
    color: #3250ff;
}
.btn-delete {
    color: red;
}
</style>
