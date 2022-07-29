<template>
  <div id="app" v-cloak>
    <!-- 返回 -->
    <div class="back" @click="back"></div>
    <!-- 头部 -->
    <div class="header">
      <div class="title"></div>
      <div class="bird"></div>
    </div>
    <!-- list -->
    <ul class="content" v-for="(item, index) in common" :key="index">
      <li :ref="list" @click="goRead(item.id)">
        <div class="title_left" :ref="left">{{ item.number }}</div>
        <div class="title_right">
          <div class="right_title" :ref="right">{{ item.title }}</div>
          <div class="yiwen">{{ fanyi[index] }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
export default {
  setup() {
    // router
    const router = useRouter();
    // vuex
    const store = useStore();
    // 静态数据
    const state = reactive({
      common: [],
      fanyi: [],
      list:[],
      right:[],
      left:[]
    });
    // 请求数据
    getDate();
  async function getDate() {
      let lang = store.state.lang;
      const res = await axios.get("https://lz06-1301325388.cos.ap-chengdu.myqcloud.com/temp/content.json");
        state.common = res.data.common;
        if (lang == "zh") {
          state.fanyi = "";
          nextTick(() => {
            lineHeight();
          });
        } else {
          state.fanyi = res.data[lang];
        }
    }
    // 手动接收ref的数组，然后再使用
    const left = el =>{ state.left.push(el)}
    const right = el =>{ state.right.push(el)}
    const list = el =>{ state.list.push(el)}
  
    onMounted(() => {
      setTimeout(() => {
         lineColor()
      }, 200);
    });
    // 只有中文情况下设置行高
    function lineHeight() {
      for (let i = 0; i < state.left.length; i++) {
        state.left[i].style.lineHeight = "84px";
        state.right[i].style.lineHeight = "84px";
      }
    }

    function lineColor() {
        for (let i = 0; i < state.list.length; i++) {
          if (i % 2 == 0) {
            state.list[i].style.backgroundColor = "#f5f5f5";
          }
        }
    }
    function goRead(id) {
      router.push({
        path: "/Read",
        query: {
          id: id,
        },
      });
    }
    function back() {
      router.go(-1);
    }
    return {
      ...toRefs(state),
      back,
      goRead,
      list,
      left,
      right,
    };
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.header {
  position: relative;
  display: flex;
  width: 100%;
  height: 10vh;
  border-bottom: 1px solid #adadad;
}
.title {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  width: 237px;
  height: 34px;
  background: url("../CommonAsset/img/content/题目.png") no-repeat;
}
.bird {
  position: absolute;
  top: 45%;
  right: 2%;
  width: 42px;
  height: 42px;
  background: url("../CommonAsset/img/content/鸟.png") no-repeat;
}
.back {
  position: absolute;
  top: 1%;
  left: 5%;
  width: 28px;
  height: 28px;
  z-index: 2;
  background: url("../CommonAsset/img/content/返回.png") no-repeat;
}
.content {
  width: 100%;
}
.content > li {
  display: flex;
  width: 100%;
  height: 80px;
}
.title_left {
  width: 15%;
  color: #2d2d2d;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  line-height: 50px;
}
.title_right {
  height: 50px;
  margin-left: 3%;
  /* line-height: 50px; */
}
.right_title {
  color: #2d2d2d;
  font-size: 20px;
  height: 40px;
  line-height: 50px;
  font-weight: bold;
}
.yiwen {
  height: 5px;
  color: #007eff;
}
</style>
