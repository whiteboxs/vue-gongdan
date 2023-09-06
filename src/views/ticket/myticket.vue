<template>
  <el-card class="manage">
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入" v-model="queryform.keyword"></el-input>
      </el-col>
      <el-button type="primary" icon="Search" @click="onSearch">Search</el-button>
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
        <!-- <el-upload ref="upload" class="upload-files" action="" name="files" multiple :auto-upload="false"
          :file-list="fileList" :on-change="handleChange" style="margin-top: 20px">
          <el-button slot="trigger" type="primary">选取文件</el-button>
        </el-upload> -->
        <el-upload
            v-model:file-list="fileList"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
      </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submit">创建</el-button>
        </span>
      </template>
    </el-dialog>

    <el-table :data="myticketstore.myticketlist" flex="true" :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      stripe style="width: 100%" height="100%">
      <!-- <el-table-column  prop="create_time" label="创建日期" width="176px" min-width="10%" /> -->
      <el-table-column :label="item.label" :prop="item.prop" v-for="(item, index) in list " :key="index"
        min-width="10%" />
      <el-table-column label="操作" width="145px" min-width="10%">
        <template #default="{ row }">
          <el-button type="primary" @click="onEdit(row)" link>编辑</el-button>
          <el-button link type="danger" @click="ticketDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="queryform.pagenum" :page-size="queryform.pagesize" :page-sizes="[10, 20, 30, 40]"
      background layout="total, sizes, prev, pager, next, jumper" :total="myticketstore.count"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-card>
  <ticketEdit ref="editref" @onupdate="myticketstore.getmytickets" />
</template>


<script setup >
// import { Search, UploadFilled } from '@/element-plus/icons-vue'
import { onMounted } from 'vue';
import { delticket, createticket } from '@/http/api.js'
import { useassigneestore } from '@/store/assignee.js'
import { useenvironmentstore } from '@/store/environment.js'
import { usemyticketstore } from '@/store/userticket.js'
import { Plus } from '@element-plus/icons-vue'

import { UploadProps, UploadUserFile } from 'element-plus'
// onMounted(() => {
// const usestore =useAuthStore();
//    const userid= usestore.userid;
//    console.log('id',userid)
// })
//经办人
const assigneestore = useassigneestore()
//环境
const environmentstore = useenvironmentstore()
//工单
const myticketstore = usemyticketstore()


onMounted(() => {
  assigneestore.getassignee(),
    environmentstore.getenvironment(),
    myticketstore.getmytickets()
})


const centerDialogVisible = ref(false)

import { ref, reactive } from 'vue'
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
      console.log('xx', pair);
    }
    const res = await createticket(formData);
    console.log("验证成功");
    //清除提交的表单
    addRuleForm.value.resetFields()
    // 关闭窗口和刷新列表
    centerDialogVisible.value = false;
    myticketstore.getmytickets();
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
    label: '创建日期',
    prop: 'create_time'
  },
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
    prop: 'reporter'
  },
  {
    label: '经办人',
    prop: 'assignee'
  },
]




//工单删除
const ticketDelete = async (id) => {
  await delticket(id)
  myticketstore.getmytickets()

}

//工单编辑
import ticketEdit from '@/components/ticketEdit.vue';



const editref = ref(null)
const onEdit = (row) => {
  console.log('onedit', onEdit)
  editref.value.open(row)
}

//查询
const onSearch = () => {
  console.log('onSearch', queryform.value)
  queryform.value.pagenum = 1
  queryform.value.pagesize = 10
  myticketstore.getmytickets(queryform.value)
}


//上传

// const fileList = ref([])

// const handleChange = (file, files) => {
//   // file是当前上传的文件，files是当前所有的文件，
//   // 不懂得话可以打印一下这两个数据 就能明白

//   fileList.value = files
// }
const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-1.png',
    url: '/images/plant-1.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  }

])

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};




//传入后端的查询或者分页参数
const queryform = ref({
  keyword: '',
  pagenum: 1,
  pagesize: 10
}); // 当前页数

// 分页
// const total = ref(0); // 总条数

// //总页数
//   allticketstore.getallticket();
//   total.value= allticketstore.allticketlist;
//   console.log('页数',total.value)



const handleSizeChange = (pageSize) => {
  queryform.value.pagenum = 1
  queryform.value.pagesize = pageSize
  myticketstore.getmytickets(queryform.value);
}

// 处理当前页码改变事件
const handleCurrentChange = (pageNum) => {
  // console.log('Change', pageNum
  queryform.value.pagenum = pageNum;
  console.log('上传的参数', queryform.value)
  myticketstore.getmytickets(queryform.value);
};




</script>


<style lang='less' scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

.manage {
  height: 100%;
}

.el-pagination {
  justify-content: center;
  position: relative;
  bottom: -10px;
}

// :deep .el-table__fixed{
//      height: auto !important; // 让固定列的高自适应
//      bottom: 0px !important; //固定列默认设置了定位 
//      right: 10px !important;
// }
</style>  