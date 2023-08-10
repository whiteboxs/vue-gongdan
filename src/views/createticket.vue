<template>
    <div>
      <!-- 提交按钮等其他表单逻辑 -->
      创建工单
    </div>
  </template>

<script setup>
import { ref, defineComponent } from 'vue';
// 在 setup 中导入 VueFormGenerator

const formOptions = ref({
  fields: [
    {
      type: "input",
      inputType: "text",
      label: "标题",
      model: "title",
      required: true,
    },
    {
      type: "textarea",
      label: "详细信息",
      model: "description",
      required: true,
    },
    {
      type: "select",
      label: "指派人",
      model: "assignee",
      values: ["Alice", "Bob", "Charlie"],
    },
    // 其他表单字段...
  ],
});

const formData = ref({
  title: "",
  description: "",
  assignee: "",
  // 其他表单数据...
});

// 注册 VueFormGenerator 组件
//const MyFormGenerator = defineComponent(VueFormGenerator);

</script>