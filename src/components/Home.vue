<template>
  <div  v-cloak>
    <div id="app">
      <img src="../CommonAsset/img/home/BG.png"/>
    </div>
    <!-- 头部 -->
    <div class="header">
      <!-- 语言修改 -->
      <div class="languageChange">
        <el-dropdown @command="handleCommand" size="small">
          <el-button type="primary" size="small"
            >{{ changeLanguage }}&nbsp;
            <el-icon class="el-icon--right"
              ><svg
                t="1641818630955"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2112"
                width="16"
                height="16"
              >
                <path
                  d="M966.4 323.2c-9.6-9.6-25.6-9.6-35.2 0l-416 416-425.6-416c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l441.6 432c9.6 9.6 25.6 9.6 35.2 0l435.2-432C976 345.6 976 332.8 966.4 323.2z"
                  p-id="2113"
                  fill="#ffffff"
                ></path></svg></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, key) in dataItem.language"
                :command="key"
              >
                {{ item }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 主体区域 -->
    <div class="content">
      <div class="zhanwei"></div>
      <div class="title"></div>
      <!-- 目录按钮 -->
      <div class="directory" @click="goContent"></div>
      <!-- download -->
      <ul class="download">
        <li><img src="../CommonAsset/img/home/download-1.png" /></li>
        <li @click="goDownload">
          <img src="../CommonAsset/img/home/download-2.png" />
        </li>
        <li><img src="../CommonAsset/img/home/download-3.png" /></li>
      </ul>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import { reactive, toRefs} from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import {useStore} from "vuex";
import Url from '../CommonAsset/js/config';
export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      // 语言数据
      dataItem: "",
      // 语言切换
      language: "",
      changeLanguage: "",
    });
     // 请求数据
    getDate();
    const store = useStore()
    function getDate() {
      axios
        .get(Url+"/api/data.php?action=getIndexData")
        .then((res) => {
          // 获取VUEX数据
          let lang = store.state.lang;
          state.language = res.data.language;
          state.dataItem = res.data;
          if (lang == "" || lang == "null") {
            lang = "zh";
          }
          handleCommand(lang);
        });
    }
    // // 选择语言
    function handleCommand(lang) {
        // VUEX
        store.commit("LANG",lang)
      state.changeLanguage = state.language[lang];
    }
    // 跳转
    function goContent() {
      router.push("/Content");
    }
    function goDownload() {
      router.push("/Download")
    }
    // 暴露出去
    return {
      ...toRefs(state),
      goContent,
      handleCommand,
      goDownload
    };
  },

};
</script>

<style scoped>
#app {
  position: fixed;
  z-index: -1;
  width: 100%;
}
#app img{
  width: 100%;
}
.title {
  width: 251px;
  height: 180px;
  margin: 10% auto 0;
  background: url("../CommonAsset/img/home/logo.png") no-repeat;
}
.directory {
  width: 141px;
  height: 117px;
  margin: 0 auto;
  margin-top: 25%;
  background: url("../CommonAsset/img/home/进入目录.png") no-repeat;
}
.download {
  width: 284px;
  margin-top: 25%;
  margin-left: 20%;
}
.header {
  position: absolute;
  top: 3%;
  left: 7%;
}
.footer{
  width: 100%;
  height: 200px;
}
.zhanwei{
   width: 100%;
  height: 50px;
}
[v-cloak] {
  display: none;
}
</style>
