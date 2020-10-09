<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <Header />
    <Sidebar />
    <router-view class="margin-top-10" style="padding-left:230px;padding-right:10px"></router-view>
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
