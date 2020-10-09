<template>
  <div id="side" class="width-210 color-333 align-left position-a left-0 top-70">
   	<ul class="border-bottom-1 border-eee">
   		<template v-for="(item,index) in menu">
   			<li class="font-size-14 margin-bottom-10" style="border-bottom: 1px solid #eee;" :key="index">
        <div class="title color-333 padding-left-40">
   				<i class="padding-right-13 color-999 fa" :class="item.icon"></i>
   				<span class="color-333">{{item.title}}</span>
        </div>
				<ul class="position-r overflow-hidden margin-top-10 ">
			   		<template v-for="(item2,index2) in item.children">
			   			<li class="position-r line-height-36 padding-left-55 menu" v-if="item2.url!=''">
							   <router-link active-class="a-link" :to="'/'+item2.url" tag="span" class="margin-left-10 pointer" data-module="log">{{item2.title}}</router-link>
			   			</li>
              <li class="position-r line-height-36 padding-left-40 margin-10 margin-bottom-20" v-else>
                  <div class=" padding-left-10 menu2"><i class="el-icon-plus color-ccc padding-right-5 bold"></i>{{item2.title}}</div>
              </li>
			   		</template>
			   	</ul>
   			</li>
   		</template>
   	</ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Header extends Vue {
	// 左侧导航
            menu=[
                {
                  title:'统计',
                  select:true,
                  icon:'fa fa-tachometer',
                  children:[
                    {title:'首页',select:true,url:'index'},
                    {title:'登录日志',select:false,url:'log'},
                  ]
                },
                {
                  title:'管理',
                  select:false,
                  icon:'fa fa-folder-open',
                  children:[
                    {title:'栏目中心',select:false,url:'root'},
                    {title:'标签中心',select:false,url:'tag'},
                    {title:'关键词库',select:false,url:'keywords'},
                    {title:'文章中心',select:false,url:'article'},
                    {title:'用户管理',select:false,url:'user'},
                    {title:'友情链接',select:false,url:'link'},
                    {title:'广告管理',select:false,url:'adsense'},
                    {title:'图片轮播',select:false,url:'slider'},
                    {title:'新功能开发中',select:false,url:''},
                  ]
                },
                {
                  title:'功能',
                  select:false,
                  icon:'fa fa-windows',
                  children:[
                    {title:'留言板',select:false,url:'bbs'},
                    {title:'客服信息',select:false,url:'help'},
                    {title:'站长统计',select:false,url:'cnzz'},
                    // {title:'页面静态化',select:false,url:'html'},
                  ]
                },
                {
                  title:'设置',
                  select:false,
                  icon:'fa fa-cogs',
                  children:[
                    {title:'首页SEO',select:false,url:'index_seo'},
                    {title:'版权信息',select:false,url:'copyright'},
                    {title:'常规选项',select:false,url:'system'},
                    // {title:'用户管理权限',select:false,url:'authority'},
                  ]
                },
            ]
            // 左侧导航
}
</script>
<style type="text/css">
#side .menu:hover {background-color: rgba(0, 0, 0, 0.03);}
#side .menu2 {border: 2px dashed #D9DADC;}
#side .menu2:hover {border: 2px dashed #b2b2b2;}
</style>