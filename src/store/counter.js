
import { defineStore } from "pinia";
import { getusers } from '../http/api'
export const usecounterstore = defineStore('counter', () => {
    //定义数据state
    const count = ref(0)

    //定义修改数据的方法 action 同步+异步
    const increment = () => {
        count.value++
    }

    //getter定义
    const doublecount = computed(() => count.value * 2)

    //异步请求
    const list = ref([])
    const getlist = async () => {
        const res = await getusers()
        list.value = res.data.data
        console.log(res.data.data)
    }


    //对象的方式return供组件使用
    return {
        count,
        increment,
        doublecount,
        list,
        getlist
    }
})