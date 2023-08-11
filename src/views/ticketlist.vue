<template>
 <div class="app">
    <el-table :data="ticketlistdata" class="">
      <el-table-column :label="item.label" v-for="(item,index) in list" :key="index" :prop="item.prop" />
    </el-table>
  </div>
  <Edit ref="editref" @onupdate="getlist"/>
</template>


<script setup>

const list= [
           {
                label: '工单号',
                prop: 'id'
           },
           {
                label: '标题',
                prop: 'title'
           },
           {
                label: '环境',
                prop: 'environment_id'
           },
           {
                label: '工单状态',
                prop: 'status'
           },
           {
                label: '详细内容',
                prop: 'description'
           },
           {
                label: '指派人',
                prop: 'user_id'
           },
           {
                label: '经办人',
                prop: 'assignee_id'
           },
           
           {
                label: '创建时间',
                prop: 'create_time'
           }
]


import { getalltickets } from '../http/api.js'
import { ref} from 'vue'
const ticketlistdata = ref([])
const getlist = async () => {
  //接口调用
  const res = await getalltickets()
  console.log(res.data.data)

  //获取的数据交给list存放
  //console.log('Is the response an array?', Array.isArray(res.data.data));
  ticketlistdata.value = res.data.data
  console.log(ticketlistdata.value)
}  
onMounted(() =>  getlist())



</script>


<style lang="less" scoped>
.app {
  width: 980px;
  margin: 100px auto 0;
}
</style>