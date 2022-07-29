<template>
  <div class="father">
      <div @click="back" class="back"></div>
      <div class="backImage">
      </div>
      <div class="tupian_zh">
        <img src="../CommonAsset/img/熊猫图上.png">
      </div>
      <div id="next"> 
        <video
          ref="flash"
          src="http://1301325388.vod2.myqcloud.com/aea92fccvodtranscq1301325388/f7a64107387702291420175521/v.f100030.mp4"
          controls
        ></video>
      </div>
      <div class="tupian_en">
        <img src="../CommonAsset/img/熊猫图英文.png">
      </div>
    </div>
</template>

<script>
import { ref,onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    let flash = ref();
    const store = useStore();
    const router = useRouter();
    let url = store.state.videoUrl
     // 返回
    function back() {
      router.go(-1);
    }
    onMounted(()=>{
        flash.value.src = url
    })
    return {
      flash,
      back
    };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.father {
  position: relative;
}
.backImage {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.backImage > img {
  width: 100%;
  height: 100%;
}
#next {
  width: 100vw;
  height: 26vh;
  position: absolute;
  top: 35%;
  background-color: black;
}
.back {
  width: 61px;
  height: 32px;
  position: absolute;
  top: 3%;
  right: 3%;
  background: url("../CommonAsset/img/返回gray.png") no-repeat;
  animation: show 1s;
}
#next > video {
  width: 100%;
}
.tupian_zh {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 241px;
  height: 114px;
}
.tupian_en {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  width: 248px;
  height: 77px;
}
</style>
