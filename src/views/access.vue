<template>
    <good-page class=" access">
        <good-breadcrumb :list="constant.breadcrumb.access" />
        <div class="layout">
           <good-box class="height-250 margin-bottom-15 align-center overflow-hidden" :data="true">
                <div>
                    <chartist
                    ratio="ct-major-second"
                    type="Line"
                    :data="minutetData"
                    :options="chartOptions" >
                </chartist>
                </div>
                <span class="color-999">博客近24分钟在线访问量</span>
            </good-box>

            <good-box class="height-250 margin-bottom-15 align-center overflow-hidden" :data="true">
                <div>
                    <chartist
                    ratio="ct-major-second"
                    type="Line"
                    :data="hourData"
                    :options="chartOptions" >
                </chartist>
                </div>
                <span class="color-999">博客24小时访问量</span>
            </good-box>

            <good-box class="height-250 margin-bottom-15 align-center overflow-hidden" :data="true">
                <div>
                    <chartist
                    ratio="ct-major-second"
                    type="Line"
                    :data="dayData"
                    :options="chartOptions" >
                </chartist>
                </div>
                <span class="color-999">博客近30日访问量</span>
            </good-box>
         </div>
    </good-page>
</template>

<script lang="ts">
import { Component,Vue } from 'vue-property-decorator';
import service from '@/service/index'

@Component
export default class Index extends Vue {
  minutetData={
      labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
      series:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
  }
  hourData={
      labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
      series:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
  }
  dayData={
      labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
      series:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
  }
  chartOptions={
      width: '100%',
      height: 200,
      low: 0,
  }
  filePath
  total
  params={
      google: "t-10001",
      operating: "lists",
      page: 0,
      pagesize: 10,
  }

  private created() {
    this.dataList();
    this.dataList2();
    this.dataList3();
  }

  dataList(){
    service.api2('good').then(res =>{
      this.$set(this.minutetData,'labels',res.data.minute.time)
      this.$set(this.minutetData,'series',[res.data.minute.data])
    })
  }

  dataList2(){
    service.api2('good2').then(res =>{
      this.$set(this.hourData,'labels',res.data.hour.time)
      this.$set(this.hourData,'series',[res.data.hour.data])
    })
  }

  dataList3(){
    service.api2('good3').then(res =>{
      this.$set(this.dayData,'labels',res.data.day.time)
      this.$set(this.dayData,'series',[res.data.day.data])
    })
  }

}
</script>
<style type="text/css" scope>
.access .ct-major-second{height: 200px;}
.access .ct-series-a .ct-bar, 
.access .ct-series-a .ct-line, 
.access .ct-series-a .ct-point, 
.access .ct-series-a .ct-slice-donut {
    stroke: var(--primary)!important;
}
.access .ct-label {
    color: rgba(0,0,0,.2)!important;
}
.access .ct-grid {
    stroke: rgba(0,0,0,.2)!important;
    stroke-width: 1px;
    stroke-dasharray: 2px;
}

.access .ct-chart {height: 200px;}
</style>