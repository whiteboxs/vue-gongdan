<template>
  <el-dialog v-model="DialogVisible" title="编辑工单" width="30%" align-center>
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题"><el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="问题环境">
        <el-select v-model="form.environment_id">
          <el-option :label="item.name" :value="item.id" v-for="item in envdata" :key="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="问题详情">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item label="经办人">
        <el-select v-model="form.assignee_id" placeholder="请选择经办人">
          <el-option :label="item.name" :value="item.id" v-for="item in assigneedata" :key="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="DialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onupdate">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// TODO: 编辑
import { getenvironments, getassignees, putticket } from '../http/api.js'
import { ref } from 'vue'
// 弹框开关
const DialogVisible = ref(false)
//弹窗里获取父表单里对应列的数据
const form = ref({
  title: '',
  environment_id: '',
  description: '',
  assignee_id: '',
  id: ''
})


//环境接口
const envdata = ref([])
const envlist = async () => {
  const res = await getenvironments()
  envdata.value = res.data.data
}
onMounted(() => envlist())

// 经办人接口
const assigneedata = ref([])
const assigneelist = async () => {
  const res = await getassignees()
  assigneedata.value = res.data.data
}
onMounted(() => assigneelist())

const open = (row) => {
  console.log('当前编辑行', row)
  form.value.title = row.title
  form.value.id = row.id
  form.value.environment_id = row.environment
  console.log('取到的env', form.value.environment_id)
  form.value.description = row.description
  form.value.assignee_id = row.assignee
  console.log('取到的经办人', form.value.assignee_id)
  DialogVisible.value = true

}
defineExpose({
  open
})

//更新
const emit = defineEmits(['onupdate'])
const onupdate = async () => {
  try {
    //1.收集表单数据，调用接口
    console.log('put钱的值',form)
    await putticket(form.value.id, {
      title: form.value.title,
      environment_id: form.value.environment_id,
      description: form.value.description,
      assignee_id: form.value.assignee_id,
    })
    //2.关闭弹窗
    DialogVisible.value = false

    //3.通知父主键做列表更新(子传父)都感觉超难
    emit('onupdate')
  } catch (error) {
    console.error('更新工单出错：', error);
    // 根据需要处理错误
  }
}
</script>



<style scoped>
.el-input {
  width: 290px;
}
</style>
