<template>
  <div id="app" v-cloak>
      <!-- 返回 -->
    <div class="back" @click="back"></div>
    <div class="backImg">
      <img src="../CommonAsset/img/download/BG.png" />
    </div>
    <div class="title common"></div>
    <ul class="undownload common">
      <li>
        <img
          src="http://www.scxhlz.com/download/xiongmao/images/google-play_grey.png"
        />
      </li>
      <li>
        <img
          src="http://www.scxhlz.com/download/xiongmao/images/appstore-g.png"
        />
      </li>
    </ul>
    <div class="icon common"></div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
     const router = useRouter();
    const state = reactive({
      count: 0,
    });
     function back() {
      router.go(-1);
    }
    return {
      ...toRefs(state),
      back
    };
  },
};
</script>

<style scoped>
.backImg {
  width: 100%;
  height: 812px;
  position: fixed;
  z-index: -1;
}
.backImg img {
  width: 100%;
}
.title {
  position: absolute;
  top: 5%;

  width: 251px;
  height: 180px;
  background: url("../CommonAsset/img/download/logo.png") no-repeat;
  background-size: 100%;
}
.undownload {
  position: absolute;
  top: 40%;
}
.undownload li img {
  width: 100%;
}
.undownload li:nth-child(2) {
  margin-top: 20%;
}
.icon {
  position: absolute;
  top: 80%;
  width: 79px;
  height: 70px;
  background: url("../CommonAsset/img/download/lezhilogo.png");
}
.common {
  left: 50%;
  transform: translateX(-50%);
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
[v-cloak] {
  display: none;
}
</style>
