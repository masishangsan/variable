<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
    body{
        margin: 0;
        background-color:#EFEFEF;

    }
.el-button.is-plain:active {
    color: rgba(26, 179, 148, 1);
    border-color: rgba(26, 179, 148, 1);
}
.el-button.is-plain:focus, .el-button.is-plain:hover {
    background: #fff;
    color: rgba(26, 179, 148, 1);
    border-color: rgba(26, 179, 148, 1);
}
.el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color:  rgba(26, 179, 148, 1);
    outline: 0;
}
.el-select .el-input.is-focus .el-input__inner {
    border-color: rgba(26, 179, 148, 1);
}
.el-textarea__inner:focus {
    outline: 0;
    border-color: rgba(26, 179, 148, 1);
}
    .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .fun .el-input__inner{
        height: 56px;
        border-radius: 0 6px 6px 0;
    }
    .author .input-new-tag {
        min-width: 100px;
    }
    .el-input--suffix .el-input__inner{

    }
    .tags .el-input__inner{
        width: 190px;
    }
    .nc_btn{
        background-image: linear-gradient(-180deg, #00BF93 4%, #1C9A7E 98%);
        border-radius: 6px;
        text-align: center;
        color: #fff;
        cursor: pointer;
    }
    .nc_select .el-input__inner{
        height: 50px;
    }
    .nv_btn_2{
        background: #FFFFFF;
        border: 1px solid #009E79;
        border-radius: 6px;
        color: #009E79;
        text-align: center;
        cursor: pointer;
    }
    .el-dialog{
        width: 30%;
    }
    .el-dialog__header{
        text-align: center;
    }
    .nv_btn_3{
        color: #fff;
        background-color: #8590a6;
        border-color: #8590a6;
        border-radius: 6px;
        text-align: center;
        width: 76px;
        height: 40px;
    }
.el-dialog__body{
    padding: 15px 20px 30px;
}
    .login_box .el-checkbox__input.is-checked+.el-checkbox__label {
         color: #606266;
    }
    a{
        text-decoration: none;
    }
</style>
