<template>
  <div id="login">
    <video id="video-background" preload="auto" autoplay="true" loop="loop" muted="muted">
		<source src="../../assets/img/7btrrd.mp4" type="video/mp4">
	</video>
	<div id="video-content">
		<h1>欢迎进入后台管理系统</h1>
		<!-- <p>Mall Management</p> -->
        <p>輗軏</p>
        <div class="form">
            <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
            <el-input v-model="user.password" type="password" placeholder="请输入密码"></el-input>
            <el-button type="danger" @click="login">登录</el-button>
        </div>
	</div>
    <!-- <div class="bg">
        <div class="form">
            <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
            <el-input v-model="user.password" type="password" placeholder="请输入密码"></el-input>
            <el-button type="danger" @click="login">登录</el-button>
        </div>
    </div> -->
  </div>
</template>

<script>

import { managerLogin } from '@/request/api'
import { successAlert } from '@/utils/alert'
import { mapActions } from 'vuex'


export default {
    data(){
        return {
            user:{
                username:'',
                password:'',
            }
        }
    },
    methods:{
        ...mapActions({
            requestUser:'userActions',
        }),
        login(){
            if(this.user.username && this.user.password){
                managerLogin(this.user).then(res => {
                    console.log(res);
                    if(res.code === 200){
                        //消息提示
                        successAlert(res.msg)
                        //数据存储
                        this.requestUser(res.list)
                        //路由跳转
                        this.$router.push('/index');
                    }
                })
            }
            // this.$router.push('/index');
        }
    }
}
</script>

<style scoped>
/*scoped:局部作用域 */
/* #login{ 
    width:100vw;
    height:100vh;
    background:url(../../assets/img/login@3x.png);
    box-shadow: 0 2px 6px 0 rgba(255,149,128,0.50);
    z-index: 100;
} */
#video-background {
			position: fixed;
			top: 0;
			left: 0;
			min-width: 100%;
			min-height: 100%;
			z-index: -1;
		}
		#video-content {
			position: relative;
			z-index: 1;
			width: 80%;
			margin: 0 auto;
			padding-top: 100px;
			text-align: center;
		}
		h1 {
			font-size: 4rem;
			color: #fff;
			text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
		}
		p {
			font-size: 2rem;
			color: #fff;
			text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
		}
/* .bg{
    width:847px;
    height:528px;
    background-size:100% 100%;
    position: absolute;
    right:120px;
    top:50%;
    transform: translateY(-50%);
} */
.form{ 
    width:346px;
    position: absolute;
    right:440px;
    top:300px;
}
.el-input,.el-button{
    margin-bottom:30px;
    opacity: 0.7;
}
.el-button{
    width:100%;
    background-color: white;
    opacity: 0.7;
    color: #ccc;
    border: none;
}

</style>