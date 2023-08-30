<template>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in Breadcrumblist" :key="index">
        <span class="no-redirect" v-if="index === Breadcrumblist.length -1">{{ item.name }}</span>
        <span class="redirect" v-else  @click="handleRedirect(item.path)">{{ item.name }}</span>
    </el-breadcrumb-item>
    </el-breadcrumb>
  </template>


  <script setup>

import { useRoute  } from 'vue-router';
import router from '@/router/index.js'
  const route = useRoute();
  console.log('router',route.matched)

const   Breadcrumblist = ref([])
const initBreadcrumblist =()=>{
    Breadcrumblist.value = route.matched
    console.log('routervalue',route.matched)
}
const handleRedirect = (path) => {
  // console.log(path)
  router.push(path)
}

watch(route,() =>{initBreadcrumblist()}, {deep:true,immediate:true})
</script>

<style scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}
.redirect {
  color: #666;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #1f2d3d;
  }

}




</style>