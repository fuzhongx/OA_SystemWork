<template>
<div class="header">
    <el-icon @click='changeOpen' v-if="isCollapse"><Expand /></el-icon>
    <el-icon @click='changeOpen' v-else><Fold /></el-icon>
</div>

</template>

<script setup>
import {ref } from 'vue'
import bus from '@/util/Bus.js'

const isCollapse=ref()
const changeOpen=()=>{
    isCollapse.value=!isCollapse.value
    bus.emit('isCollapse',isCollapse.value)
}

</script>

<style lang="scss" scoped>
.header{
    height: 56px;
    display:flex;
    padding-left: 20px;
    align-items: center;
    z-index:999;
}
</style>