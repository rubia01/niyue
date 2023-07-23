<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        router
        default-active="/index/home"
        class="el-menu-vertical-demo"
        background-color="#20222A"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/index/home">
          <i class="el-icon-menu"></i>
          <span slot="title">后台管理</span>
        </el-menu-item>

        <!-- 动态菜单遍历 -->
        <template v-for="item in user.menus">
          <el-submenu v-if="item.children" :key="item.id" :index="item.title">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.title }}</span>
            </template>
            <p v-for="i in item.children" :key="i.id">
              <el-menu-item
              v-show="i.status == 1"
              :index="'/index' + i.url"
              >{{ i.title }}</el-menu-item
            >
            </p>
          </el-submenu>
          <el-menu-item v-else :key="item.id" :index="'/index/' + item.url">{{
            item.title
          }}</el-menu-item>
        </template>

        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item index="/index/menu">菜单管理</el-menu-item>
          <el-menu-item index="/index/Role">角色管理</el-menu-item>
          <el-menu-item index="/index/mamager">管理员管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商城管理</span>
          </template>
          <el-menu-item index="/index/category">商品分类</el-menu-item>
          <el-menu-item index="3-2">商品规格</el-menu-item>
          <el-menu-item index="3-3">商品管理</el-menu-item>
          <el-menu-item index="3-4">会员管理</el-menu-item>
          <el-menu-item index="3-5">轮播图管理</el-menu-item>
          <el-menu-item index="3-6">秒杀活动</el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        {{ user.username }}
        <el-button type="success" @click="exit">退出</el-button>
      </el-header>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index/home' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 二级路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "@/utils/alert";

export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    ...mapActions({
      requestUser: "userActions",
    }),
    exit() {
      //消息提示
      successAlert("退出成功");
      //清空缓存
      this.requestUser();
      //路由跳转
      this.$router.push("login");
    },
  },
};
</script>

<style scoped>
.el-container {
  background-color: #20222a;
}
.el-header,
.el-footer {
  /* background-color:white; */
  background-color: #ccc;
  color: #333;
  text-align: right;
  line-height: 60px;
}

.el-aside {
  /* background-image: linear-gradient(180deg, #ff6040 0%, #ff8a80 100%); */
  /* background:url(../../assets/img/coolHue-ABDCFF-0396FF.png); */
  background-color: #20222a;
  /* background-color: #0067BE; */
  color: #333;
  height: 100vh;
}
/* 内容窗口 */
.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>