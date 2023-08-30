<template>
    <div class="common-layout">
      <el-container class="lay-container">
        <commonaside/>
        <el-container class="r-container">
          <commonheader/>
          <el-main class="right-main">
            <router-view/>
          </el-main > 
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
  height: 100%;
}
.common-layout{
  height: 100%;
  &.el-container{
    height: 100%;
    &.el.aside{
      height: 100vh;
      background: #545c64 ;
    }
  }


  .lay-container{
    flex-wrap: nowrap;

    .right-main{

    }
  }   
}

</style>