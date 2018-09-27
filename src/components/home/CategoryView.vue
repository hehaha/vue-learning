<template>
    <div class="category-container">
        <div class="category-list-container">
            <div v-if="categoryArr" v-for="(cate, index) in categoryArr" :key="cate.id" :class="getItemClass(index, cate)" @click="cateClicked(cate)">
                <span>{{ cate.label }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["categoryArr", "selectedCateId"],
    methods: {
        getItemClass(index, cateItem) {
            if ((!this.selectedCateId && !index) || (this.selectedCateId && this.selectedCateId == cateItem.id)) {
                return "category-item active";
            }
            else {
                return "category-item";
            }
        },
        cateClicked(cate) {
            this.$emit("categoryClicked", cate);
        }
    }
};
</script>

<style scoped>
.category-container {
    display: inline-block;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
}
.category-list-container {
    display: inline-block;
    height: 45px;
    margin: 18.5px 11.25px 0;
}
.category-item {
    display: inline-block;
    width: 100px;
    height: 45px;
    margin: 0 3.75px;
    text-align: center;
    color: #828282;
    font-size: 15px;
    border-radius: 6px;
    background-color: #f5f4f7;
}
.category-item span {
    display: block;
    margin-top: 12px;
}
.active {
    color: #ffffff;
    background-color: #3250ff;
}
::-webkit-scrollbar {
    width: 0px;  /* remove scrollbar space */
    height: 0px;
    background: transparent;  /* optional: just make scrollbar invisible */
}
</style>
