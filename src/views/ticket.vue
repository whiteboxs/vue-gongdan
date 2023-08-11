<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="search" >Search</el-button>
      <el-button type="primary" @click="centerDialogVisible = true">
        +新增工单
      </el-button>
    </el-row>
    <el-dialog v-model="centerDialogVisible" title="创建工单" width="50%" align-center :before-close="handleClose">
      <el-form :model="form" label-width="80px" :rules="rules" ref="addRuleForm">
        <el-form-item label="标题" prop="title"><el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="运行环境" prop="environment_id">
          <el-select v-model="form.environment_id" placeholder="请选择使用环境">
            <el-option :label="item.name" :value="item.id" v-for="item in environmentstore.environmentlist"
              :key="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="工单详情" prop="description">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item label="经办人" prop="assignee_id">
          <el-select v-model="form.assignee_id" placeholder="请选择经办人">
            <el-option :label="item.name" :value="item.id" v-for="item in assigneestore.assigneelist" :key="item.id" />
          </el-select>
        </el-form-item>

        <el-upload
      ref="upload"
      class="upload-files"
      action=""
      name="files"
      multiple
      :auto-upload="false"
      :file-list="fileList"
      :on-change="handleChange"
      style="margin-top: 20px"
  >
    <el-button slot="trigger" type="primary">选取文件</el-button>
  </el-upload>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submit">创建</el-button>
        </span>
      </template>
    </el-dialog>
    <el-table :data="allticketstore.allticketlist" style="width: 100%">
      <el-table-column fixed prop="create_time" label="创建日期" width="150" sortable />
      <el-table-column :label="item.label" :prop="item.prop" v-for="(item, index) in list" :key="index" width="140" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <el-button type="primary" @click="onEdit(row)" link>编辑</el-button>
          <el-button link type="danger" @click="ticketDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <ticketEdit ref="editref" @onupdate="allticketstore.getallticket" />

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


<script setup >
import { Search,UploadFilled} from '@element-plus/icons-vue'
import { onMounted } from 'vue';
import { delticket, createticket } from '../http/api.js'
import { useassigneestore } from '../store/assignee.js'
import { useenvironmentstore } from '../store/environment.js'
import { useallticketstore } from '../store/allticket.js'
//经办人
const assigneestore = useassigneestore()
//环境
const environmentstore = useenvironmentstore()
//工单
const allticketstore = useallticketstore()


onMounted(() => {
  assigneestore.getassignee(),
    environmentstore.getenvironment(),
    allticketstore.getallticket()
})

const centerDialogVisible = ref(false)

import { ref, reactive, unref } from 'vue'
const form = reactive({
  title: '',
  environment_id: '',
  description: '',
  assignee_id: '',
})


//创建工单

const addRuleForm = ref();
const submit = async () => {
  try {
    await addRuleForm.value.validate();
    if (!form) {
      console.log("表单验证不通过");
      return; // 验证不通过时，停止继续执行下面的代码
    }
    // 如果验证通过，执行表单提交逻辑
    const formData = new FormData();
      formData.append('title', form.title);
      formData.append('environment_id', form.environment_id);
      formData.append('description', form.description);
      formData.append('assignee_id', form.assignee_id);
      fileList.value.forEach(item => {
    // 这里有个坑，在将文件append到formData的时候， item其实并不是真是数据 item.raw才是
    formData.append('attachment', item.raw)
  })
for (let pair of formData.entries()) {
  console.log('xx',pair);
}
    const res = await createticket(formData);
    console.log("验证成功");
    //清除提交的表单
    addRuleForm.value.resetFields()
    // 关闭窗口和刷新列表
    centerDialogVisible.value = false;
    allticketstore.getallticket();
  } catch (err) {
    console.log("表单验证出错：" + err);
  }
};

//关闭按钮
const handleClose = () => {
  addRuleForm.value.resetFields(); // 清空表单数据
  centerDialogVisible.value = false;
};


const rules = reactive({
  title: [
    {
      required: true, message: '请输入标题', trigger: 'blur'
    }
  ],
  environment_id: [
    {
      required: true, message: '请选择使用环境', trigger: 'change',
    }
  ],
  description: [
    {
      required: true, message: '请输入具体信息', trigger: 'blur',
    }
  ],
  assignee_id: [
    {
      required: true, message: '请选择使用经办人', trigger: 'change',
    }
  ]
})

const list = [
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




//工单删除
const ticketDelete = async (id) => {
  await delticket(id)
  allticketstore.getallticket()

}

//工单编辑
import ticketEdit from '../components/ticketEdit.vue';
const editref = ref(null)
const onEdit = (row) => {
  console.log('onedit', onEdit)
  editref.value.open(row)
}


const search = () => {
  // Implement search logic here using 'searchText' value
};


//上传

const fileList = ref([]) 

const handleChange = (file, files) => {
  // file是当前上传的文件，files是当前所有的文件，
  // 不懂得话可以打印一下这两个数据 就能明白
  
  fileList.value = files
}




</script>


<style lang='less' scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
</style>