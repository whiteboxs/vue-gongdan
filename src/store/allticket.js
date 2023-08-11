
import { defineStore } from "pinia";
import { getalltickets } from '../http/api'
export const useallticketstore = defineStore('allticket', () => {
    //定义数据state
    const allticketlist = ref([])

    //定义修改数据的方法 action 同步+异步




    //异步请求
    const getallticket = async () => {
        const res = await getalltickets()
        allticketlist.value = res.data.data
        console.log(allticketlist)
      }


    //对象的方式return供组件使用
    return {
    getallticket,
    allticketlist
    }
})
