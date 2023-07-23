<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column
        prop="specsname"
        label="规格名称"
        width="180"
      ></el-table-column>
      <el-table-column prop="rolename" label="规格属性" width="250">
        <template v-slot="scope">
          <el-button
            v-for="item in scope.row.attrs"
            :key="item"
            type="success"
            >{{ item }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template v-slot="scope">
          <el-button v-if="scope.row.status === 1" type="success"
            >启用</el-button
          >
          <el-button v-else type="danger">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      background
      :page-size="size"
      @current-change="curlPage"
      layout="prev, pager, next"
      :total="count">
    </el-pagination> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "@/utils/alert";
import { specsDel } from "@/request/api";
export default {
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters({
      tableData: "specs/list",
      count: "specs/count",
      size: "specs/size",
    }),
  },
  methods: {
    ...mapActions({
      requestPage: "specs/pageActions",
      requestSpecs: "specs/listActions",
      requestCount: "specs/countActions",
    }),
    curlPage(page) {
      //发起当前页请求
      this.requestPage(page);
      //发起列表请求
      this.requestSpecs();
    },
    //删除一条数据
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除请求
          //发起删除请求
          specsDel({ id }).then((res) => {
            if (res.code === 200) {
              // 消息提示
              successAlert(res.msg);
              // 更新列表
              this.requestSpecs();
              //更新总数
              this.requestCount();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.requestSpecs();
    this.requestCount();
  },
};
</script>

<style>
</style>