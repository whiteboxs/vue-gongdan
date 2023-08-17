
import { defineStore } from "pinia";
import { getalltickets } from '../http/api'
import { ref } from "vue";
import {useAuthStore} from './user.js'

export const useallticketstore = defineStore('allticket', () => {
    //定义数据state
    const allticketlist = ref([])

    //订单总数
    const count =ref(0)




  const filteredTickets = computed(() => {
  // 获取要过滤的用户ID
   const usestore =useAuthStore();
   const targetUserId = usestore.userinfo.user_id;
   console.log('复制前的',usestore.userinfo.user_id)
   console.log('复制后的',targetUserId)
   console.log('3',allticketlist.value)
   console.log('tick表里userid',allticketlist.user_id)
  // 过滤allticketlist列表，只保留匹配目标用户ID的信息
  //const filteredData = allticketlist.value.filter(item => item.user_id === targetUserId);
  const filteredData = allticketlist.value
    .flatMap(item => item) // 展开数组
    .filter(item => item.user_id === targetUserId); // 过滤数据
  console.log('过滤后的数据',filteredData)
  return filteredData;
});

    //异步请求
    const getallticket = async (queryform) => {
        const res = await getalltickets(queryform)
        allticketlist.value = res.data.data
        count.value = res.data.count
        console.log('请求带的参数',allticketlist.value)
      }



    //对象的方式return供组件使用
    return {
    getallticket,
    allticketlist,
    count,
    filteredTickets
    }
})
