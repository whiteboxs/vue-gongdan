<template>
    <!-- <button @click="counterstore.increment" >{{ counterstore.count }}</button>
    {{ counterstore.doublecount }} -->

    <button @click="increment" >{{ count }}</button>
    {{ doublecount }}

    <ul>
        <li v-for="item in counterstore.list" :key="item.id">{{ item.username }}</li>
    </ul>
</template>


<script setup>
//定义方法得到store实例对象
import {usecounterstore} from  '../store/counter.js'
import {storeToRefs } from 'pinia'
const counterstore = usecounterstore()


onMounted(()=>{
    counterstore.getlist()
})


//直接解构复制会响应式丢失
//如 const {count,deublecount} = counterstore,下面方法对{{}}里的不要用xx.ss写后面的ss就行
const {count,doublecount} = storeToRefs(counterstore)

//方法从原来的storecount解构 不要用counterstore.increment  xx.count
const {increment} =counterstore


</script>