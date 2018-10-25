<template>
    <div class="resume-cell">
        <div class="content-container">
            <div class="cell-title">
                <span>{{ title }}</span>
            </div>
            <div class="cell-val">
                <input 
                    :value="val" 
                    :placeholder="placeholder" 
                    @change="$emit('update:val', $event.target.value)"/>
            </div>
        </div>
        <div class="seperator"></div>
    </div>
</template>

<script>
export default {
    props: ['title', 'val', 'placeholder'],
};
</script>

<style scoped>
.resume-cell {
    display: inline-block;
    width: 100%;
    height: 55px;
}
.content-container {
    display: flex;
    align-items: center;
    height: 54px;
}
.cell-title {
    margin-left: 15px;
}
.cell-val {
    flex-grow: 1;
    padding-right: 15px;
}
.cell-val input {
    border: none;
    width: 100%;
    text-align: right;
    font-size: 18px;
}
.cell-val input:focus {
    outline: none;
    border: none;
}
.seperator {
    margin: 0 15px;
    height: 1px;
    background-color: #f5f4f7;
}
</style>
