<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.index" />
        <good-box :data="true">
        <div class="color-white clearfix padding-10">
            <div class="height-220 align-center radius-5 padding-20 padding-20 float-left margin-right-20 margin-bottom-20" style="background: rgb(84, 173, 88); width: 48%; min-width: 400px; max-width: 500px;">
                <div>
                    <chartist
                    ratio="ct-major-second"
                    type="Line"
                    :data="chartData"
                    :options="chartOptions" >
                </chartist>
                </div>
                <span>12日内访问量</span>
            </div>

            <div class="height-220 align-center radius-5 padding-20 padding-20 float-left margin-right-20 margin-bottom-20" style="background:#962eaf; width: 48%; min-width: 400px; max-width: 500px;">
                <div>
                    <chartist
                    ratio="ct-major-second"
                    type="Bar"
                    :data="chartData"
                    :options="chartOptions" >
                </chartist>
                </div>
                <span>12日内访问量</span>
            </div>
            <div class="clear"></div>
            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background: rgb(32, 160, 255); width: 28%; min-width: 360px;"><div>当前用户访问次数<span class=" block font-size-24 padding-top-10">{{loginTotal}}</span></div><div class="margin-top-20">上一次访问时间是<span class=" block font-size-24 padding-top-10">{{lastTime}}</span></div></div>

            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background:#f7ba2a; width: 28%; min-width: 360px;"><span>用户</span><span class="block font-size-36 margin-top-30 align-center">{{userTotal}}</span></div>

            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background: #f7ba2a; width: 28%; min-width: 360px;"><span>文章</span><span class="block font-size-36 margin-top-30 align-center">{{articleTotal}}</span></div>

            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background: rgb(32, 160, 255); width: 28%; min-width: 360px;"><span>访问</span><span class="block font-size-36 margin-top-30 align-center">{{rizhiTotal}}</span></div>

            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background: rgb(247, 186, 42); width: 28%; min-width: 360px;"><span>今日访问</span><span class="block font-size-36 margin-top-30 align-center">{{todayTotal}}</span></div>

            <div class="width-400 height-180 background-red margin-bottom-20 float-left radius-5 padding-20" style="background: rgb(247, 186, 42); width: 28%; min-width: 360px;"><span>昨日访问</span><span class="block font-size-36 margin-top-30 align-center">{{yesterdayTotal}}</span></div>
        </div>
        </good-box>
    </good-page>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import service from '@/service/index'
import list from './mixins/list'     //列表
import edit from './mixins/edit'   //编辑
import gsap from "gsap";
@Component({
  mixins: [list,edit],
})
export default class Index extends mixins( list) {

    chartData= {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
        series:[[0,0,0,0,0,0,0]],
    }
    chartOptions={
        width: 460,
        height: 150,
        low: 0,
       /* axisX: {
            labelInterpolationFnc: function(value, index) {
              return 30 % 2 === 0 ? 10 : null;
            }
        }*/
    }
  tweenedNumber=0

  lastTime=''
  data2={
    loginTotal:0,
    userTotal:0,
    articleTotal:0,
    rizhiTotal:0,
    todayTotal:0,
    yesterdayTotal:0,
  }
  list
  total
  google= "t-20008"
  params={
      "google":this.google,
      "operating":"lists",
  }

  params2={}


  get loginTotal(){return this.data2.loginTotal.toFixed(0);}
  get userTotal(){return this.data2.userTotal.toFixed(0);}
  get articleTotal(){return this.data2.articleTotal.toFixed(0);}
  get rizhiTotal(){return this.data2.rizhiTotal.toFixed(0);}
  get todayTotal(){return this.data2.todayTotal.toFixed(0);}
  get yesterdayTotal(){return this.data2.yesterdayTotal.toFixed(0);}


  private created() {
    service.api(this.params).then(res =>{
        
        this.lastTime=res.data.last_time;
        this.$set(this.chartData,'labels',res.data.online_date)
        this.$set(this.chartData,'series',[res.data.online])

        const data=res.data;

        gsap.to(this.$data.data2, { duration: 0.5, loginTotal: data.login_total });
        gsap.to(this.$data.data2, { duration: 0.5, userTotal: data.user_total });
        gsap.to(this.$data.data2, { duration: 0.5, articleTotal: data.article_total });
        gsap.to(this.$data.data2, { duration: 0.5, rizhiTotal: data.rizhi_total });
        gsap.to(this.$data.data2, { duration: 0.5, todayTotal: data.today_total });
        gsap.to(this.$data.data2, { duration: 0.5, yesterdayTotal: data.yesterday_total });

    })
  }

}
</script>


<style type="text/css">
.ct-major-second{height: 160px;}
.ct-series-a .ct-bar, .ct-series-a .ct-line, .ct-series-a .ct-point, .ct-series-a .ct-slice-donut {
    stroke: hsla(0,0%,100%,.8);
}
.ct-label {
    color: hsla(0,0%,100%,.7);
}
.ct-grid {
    stroke: hsla(0,0%,100%,.2);
    stroke-width: 1px;
    stroke-dasharray: 2px;
}
.ct-chart {height: 150px;}
</style>