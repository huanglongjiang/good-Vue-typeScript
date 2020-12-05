<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <Header :class="{'fixed-header':topFixed}"/>
    <Sidebar class=" position-a top-0 bottom-0 z-index-10" :class="{'fleft-220':!sidebar,'left-0':sidebar}" style="transition:all 0.1s ease;"/>
    <router-view class="margin-top-10" :class="{'margin-top-70':topFixed,'margin-top-10':!topFixed,'padding-left-220':sidebar,'padding-left-20':!sidebar}" style=" padding-right: 20px; min-height: 450px;transition:all 0.1s ease;"></router-view>
    <Footer :class="{'padding-left-220':sidebar,'padding-left-20':!sidebar}" style="transition:all 0.1s ease;"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Footer from './components/footer.vue';

@Component({
  components: {
    Header,Sidebar,Footer
  },
})
export default class Home extends Vue {
  @State(state => state.state.topFixed) topFixed
  @State(state => state.state.sidebar) sidebar
}
</script>
<style type="text/css">
.fixed-header{position:fixed; top: 0px; right: 0px;}
.padding-left-220{padding-left: 220px;}
.fleft-220{left: -220px;}
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
