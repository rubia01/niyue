import Vue from 'vue'
let vm = new Vue();
// 封装成功的消息提示
export const successAlert = (msg) =>{
    vm.$message({
        message: msg,
        type: 'success'
      });
}

// 封装错误的消息提示
export const  errorAlert = (msg)=>{
    vm.$message.error(msg);
}


// 封装警告的消息提示
export const warnningAlert = (msg) =>{
    vm.$message({
        message: msg,
        type: 'warning'
      });
}

