<template>
  <div class="align-right margin-top-20">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component,Prop,Vue } from 'vue-property-decorator';
@Component
export default class GoodPagination extends Vue{
  @Prop() private data

  currentPage4=0
  params2=this.data.params;

  private handleSizeChange(val) {
    console.log(`每页 ${val} 条`);
  }
  private handleCurrentChange(val) {
    Object.assign(this.params2, this.data.params, {page: val-1});
  }
}
</script>
