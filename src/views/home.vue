<template>
    <div class="common-layout">
      <el-container>
        <commonaside/>
        <el-container>
          <commonheader/>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>


<script>
import {defineComponent} from 'vue';
import commonaside from '../components/commonaside.vue';
import commonheader from '../components/commonheader.vue';
export default defineComponent ({
  components: {
    commonheader,
    commonaside,
  },
})
</script>

<style lang="less" scoped>
.el-container{
  flex-wrap: wrap;
  align-items: flex-start;
}

</style>