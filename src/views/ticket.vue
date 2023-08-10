<template>
    <el-button type="primary" @click="centerDialogVisible = true">
      +新增工单
    </el-button>
    <el-dialog
      v-model="centerDialogVisible"
      title="创建工单"
      width="30%"
      align-center
      :before-close="handleClose"
  
    >
    <el-form 
    :model="form" 
    label-width="80px"
    :rules="rules"
    ref="addRuleForm"
    >
    <el-form-item label="标题" prop="title"><el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="问题环境" prop="environment_id" >
      <el-select v-model="form.environment_id" placeholder="请选择使用环境" >
        <el-option :label="item.name" :value="item.id" v-for="item in envdata" :key="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="问题详情"  prop="description">
    <el-input v-model="form.description" type="textarea" />
    </el-form-item>
    <el-form-item label="经办人" prop="assignee_id">
      <el-select v-model="form.assignee_id" placeholder="请选择经办人">
        <el-option :label="item.name" :value="item.id" v-for="item in assigneedata" :key="item.id" />
      </el-select>
    </el-form-item>
    </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">创建</el-button>
        </span>
      </template>
    </el-dialog>
  <div>
    <el-table 
    :data="ticketdata" 
    style="width: 100%"
    >
     <el-table-column  fixed  prop="create_time" label="创建日期" width="150" sortable /> 
     <el-table-column :label="item.label"  :prop="item.prop"  v-for="(item,index) in list" :key="index" width="140"/> 
    <el-table-column fixed="right" label="操作" width="120"> 
      <template #default="{ row }">
        <el-button type="primary" @click="onEdit(row)" link>编辑</el-button>
        <el-button link type="danger" @click="ticketDelete(row.id)">删除</el-button>

      </template> 
    </el-table-column>
  </el-table>
  </div>
  <ticketEdit ref="editref" @onupdate="tickelist"/>
     <!-- <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->
  </template>


  <script setup>
import { getenvironments,getassignees,getallticket,delticket,createticket} from '../http/api.js'
const centerDialogVisible = ref(false)

import { ref,reactive,unref} from 'vue'
const form = reactive({
    title: '',
    environment_id: '',
    description: '',
    assignee_id: '',
    })


//创建工单
const addRuleForm = ref();
const submit = async  () => {
    const addform = unref(addRuleForm);
    console.log('提交明细',form)
     console.log('ref',addRuleForm.value)
     console.log('unref',addform)
try {
      await addform.validate();
      if (!form) {
      console.log("表单验证不通过");
      return; // 验证不通过时，停止继续执行下面的代码
    } 
      // await addRuleForm.value.validate(); //也可以不用unref 直接用ref.vaule表单验证的写法
      // 如果验证通过，执行表单提交逻辑
    const res = await createticket(form);
    console.log("验证成功", addform);
    //清除提交的表单
    addRuleForm.value.resetFields()
    // 关闭窗口和刷新列表
    centerDialogVisible.value = false;
    tickelist();
  } catch (err) {
    console.log("表单验证出错：" + err);
  }
};



const cancel = () => {
  addRuleForm.value.resetFields(); // 清空表单数据
  centerDialogVisible.value = false;

};

const handleClose = () => {
  addRuleForm.value.resetFields(); // 清空表单数据
  centerDialogVisible.value = false;
};


const rules = reactive ({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur'
   }
   ],
  environment_id: [
    {
      required: true,message: '请选择使用环境',trigger: 'change',
    } 
    ],
  description: [
    {
      required: true, message: '请输入具体信息', trigger: 'blur' ,
    } 
    ],
  assignee_id: [
    {
      required: true,message: '请选择使用经办人',trigger: 'change',
    } 
    ]
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



const list= [
          {
              label: '工单编号',
              prop: 'id'
          },
          {
              label: '标题',
              prop: 'title'
          },
          {
              label: '业务环境',
              prop: 'environment'
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
              prop: 'username'
          },
          {
              label: '经办人',
              prop: 'assignee'
          },
]


//工单查询
const ticketdata = ref([])
const tickelist = async () => {
  const res = await getallticket()
  ticketdata.value = res.data.data
}  
onMounted(() =>  tickelist())

//工单删除
const ticketDelete = async (id) => {
  console.log(id)
  await delticket(id)
  tickelist()
}

//工单编辑
import ticketEdit from '../components/ticketEdit.vue';
const editref = ref(null)
 const onEdit = (row) => {
  console.log('onedit',onEdit)
    editref.value.open(row)
}


</script>


  <style lang='less' scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }

  
  </style>