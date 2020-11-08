<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <Header />
    <Sidebar />
    <router-view class="margin-top-10" style="padding-left: 220px; padding-right: 20px; min-height: 560px;"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';

@Component({
  components: {
    Header,Sidebar
  },
})
export default class Home extends Vue {}
</script>
<style type="text/css">
.tag-group {
    margin: 0!important;
}
.background-disabled {
    background: #f5f7fa;
}
.table-data .table-group thead.block-header {
     background: #fff; 
    color: #333;
}
.table-data .table-group th {
    padding: 8px;
    color: #909399;
    background: #fff!important; 
}
.table-data .table-group th {
    background: none;
    border: 0!important;
    border-bottom: 1px solid #ddd!important;
}
.table-data .table-group td {
    border: 0!important;
    border-bottom: 1px solid #ddd!important;
}
</style>
