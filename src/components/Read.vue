<template>
  <div id="app" v-cloak>
    <div class="app" ref="lyric">
      <img class="background" src="../CommonAsset/img/read/BG.png" />
      <div class="header">
        <div class="back" @click="back"></div>
        <div
          class="panda_head"
          @click="pandaHead"
          ref="panda"
          style="animation: move 2s infinite"
        ></div>
        <ul class="panda_list" v-show="panda_list">
          <li v-for="(item, key) in readVideo" :key="key">
            <div @click="goto_video(item.media_url)">
              <span class="circle">{{ item.content }}</span>
            </div>
          </li>
        </ul>
        <!-- 标题 -->
        <div class="title">
          <img :src="readImage" />
        </div>
      </div>
      <div style="width: 100%; height: 100px"></div>
      <!-- 内容区 -->
      <div class="content">
        <!-- 课文部分 -->
        <div
          class="lyrics"
          :ref="TextDiv"
          v-for="(item, index) in readTexts"
          :key="index"
        >
          <div :ref="list" v-for="i in item.lang">
            <div>{{ i }}</div>
          </div>
        </div>
      </div>
      <!-- 分割线 -->
      <div class="segmentation"></div>
      <div class="shengci">生词表</div>
      <div class="shengciEn">Vocabulary List</div>
      <!-- 词部分 -->
      <div v-for="(item, index) in textWord" :key="index">
        <div class="word">
          <div class="word_title">
            <div>{{ item.word }}</div>
            <!-- 听读音 -->
            <span class="ListenWord" @click="talk_word(item.luyin, index)">
              <img
                :ref="fayinchangati"
                src="../CommonAsset/img/read/听读音.png"
              />
            </span>
          </div>
          <ul class="word_list">
            <li>
              <span class="colorFor"> 拼音：</span>
              <span style="color: #868686">{{ item.pinyin }}</span>
            </li>
            <li>
              <span class="colorFor"> 级别：</span
              ><span> {{ item.wordActive }} </span>
            </li>
            <li>
              <span class="colorFor">解释：</span
              ><span style="color: #00bfbd"> {{ item.yiwen }} </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 播放器 -->
      <div class="audioBox" ref="audioBox">
        <div @click="shouqi" class="shouqi">
          <img src="../CommonAsset/img/read/三角向右.png" v-show="shouQi" />
          <img src="../CommonAsset/img/read/三角向左.png" v-show="!shouQi" />
        </div>
        <ul class="audioPlayer">
          <li @click="backMusic">
            <img src="../CommonAsset/img/read/-5秒.png" />
          </li>
          <li @click="play_music">
            <img src="../CommonAsset/img/read/播放.png" v-show="player" />
            <img src="../CommonAsset/img/read/暂停.png" v-show="pause" />
          </li>
          <li @click="fastForward">
            <img src="../CommonAsset/img/read/+5秒.png" />
          </li>
        </ul>
      </div>
      <audio ref="readTextAudio" :src="TextAudio"></audio>
      <audio ref="readAudio"></audio>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
import Url from "../CommonAsset/js/config";
export default {
  setup() {
    // 接收用useRoute,发送用userRouter,区别在RRRRRRRR
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let lang = store.state.lang;
    let id = route.query.id;
    let panda = ref(null);
    let readTextAudio = ref(null);
    let readAudio = ref(null);
    // 视频模块+头部title
    const Video = reactive({
      TextUrl: "/api/data.php?action=getTextData&",
      readImage: "",
      panda_list: false,
      readVideo: [],
      readTexts: "",
      TextAudio: "",
    });
    // 课文板块请求数据
    getReadData();
    async function getReadData() {
      const res = await axios.get(
        Url + Video.TextUrl + `contentId=${id}&lang=${lang}`
      );
      Video.readVideo = res.data.readVideo;
      Video.readTexts = res.data.readTexts;
        let str = res.data.readImage.split("/");
      Video.readImage = require("../CommonAsset/img/read/" + str[4]);
      let str1 = res.data.readAudio.split("/");
       if(id == 3){
          Video.TextAudio = require("../CommonAsset/audio/课文/" + "3.一棵会开鸽子花的树——珙桐.mp3");
       }else{
          Video.TextAudio = require("../CommonAsset/audio/课文/" + str1[4]);
       }
     
    }
    // 视频列表

    function pandaHead() {
      Video.panda_list = !Video.panda_list;
      panda.value.style.animation = "";
      if (Video.panda_list == false) {
        panda.value.style.animation = "move 2s infinite";
      }
    }
    function goto_video(url) {
      store.commit("VIDEOURL", url);
      Video.panda_list = !Video.panda_list;
      panda.value.style.animation = "move 1.4s infinite";
      router.push("/Video");
    }
    // 课文部分
    const text = reactive({
      TextDiv: [],
      list: [],
    });
    let TextDiv = (el) => {
      text.TextDiv.push(el);
    };
    let list = (el) => {
      text.list.push(el);
    };

    // =====================================================================================================生词部分
    const word = reactive({
      WordUrl: "/api/data.php?action=getWordData&",
      textWord: "",
      word_index: "",
      fayinchangati: [],
      player: true,
      pause: false,
      test: true,
      word_index: "",
    });
    // 单词板块请求数据
    getWord();
    async function getWord() {
      const res = await axios.get(
        Url + word.WordUrl + `contentId=${id}&lang=${lang}`
      );
      word.textWord = res.data.word;
    }
    let fayinchangati = (el) => {
      word.fayinchangati.push(el);
    };
    function talk_word(luyin, index) {
      let str = luyin.split("/");
      readTextAudio.value.pause();
      word.player = true;
      word.pause = false;
      if (word.word_index !== index) {
        word.test = true;
      }
      word.word_index = index;
      if (word.test) {
        word.test = false;
        readAudio.value.src = require("../CommonAsset/audio/单词/" + str[4]);
        readAudio.value.play();
        for (let i = 0; i < word.fayinchangati.length; i++) {
          word.fayinchangati[i].style.display = "block";
        }
        word.fayinchangati[index].style.display = "none";
        readAudio.value.addEventListener("ended", () => {
          word.fayinchangati[index].style.display = "block";
          word.test = true;
        });
      }
    }
    // ================================================================播放器
    const player = reactive({
      shouQi: true,
      // 当前行
      lineNo: 0,
      // 开始滚动行
      Cpos: 1,
      //定时器
      timer: null,
      listChoose: [],
      music_point: [],
    });
    // 后退5秒
    function backMusic() {
      readTextAudio.value.currentTime =
        parseInt(readTextAudio.value.currentTime) - 5;
      let audio_current = readTextAudio.value.currentTime; //后退了5秒的播放时间点
      if (!word.player) {
        if (audio_current <= 0) {
          audio_current = 0;
        }
        for (let i = 0; i < text.TextDiv.length; i++) {
          text.TextDiv[i].style.color = "black";
        }
        if (lang !== "zh") {
          for (let i = 0; i < player.listChoose.length; i++) {
            player.listChoose[i].style.color = "#007eff";
          }
        }
        for (let i = 0; i < player.music_point.length; i++) {
          if (
            parseInt(readTextAudio.value.currentTime) >= player.music_point[i]
          ) {
            player.lineNo = i;
            lineHigh(); //高亮当前行
          }
        }
        readTextAudio.value.play();
      }
    }
    //播放音乐
    function play_music() {
      word.test = true;
      readAudio.value.load();
      for (let i = 0; i < word.fayinchangati.length; i++) {
        word.fayinchangati[i].style.display = "block";
      }
      if (word.player) {
        readTextAudio.value.play();
        word.player = false;
        word.pause = true;
      } else {
        readTextAudio.value.pause();
        word.player = true;
        word.pause = false;
      }
      readTextAudio.value.addEventListener("timeupdate", () => {
        if (player.lineNo == Video.readTexts.length) return;
        const curTime = readTextAudio.value.currentTime;
        if (parseFloat(Video.readTexts[player.lineNo].currentTime) <= curTime) {
          lineHigh(); //高亮当前行
          player.lineNo++;
        }
      });
    }
    // 快进5秒
    function fastForward() {
      let currentTime = readTextAudio.value.currentTime;
      let zongshichang = parseFloat(readTextAudio.value.duration);
      if (!word.player) {
        readTextAudio.value.pause();
        let now = currentTime + 5;
        readTextAudio.value.currentTime = now;
        if (now >= zongshichang) {
          replay();
        } else {
          readTextAudio.value.play();
        }
      }
    }
    //音乐播放完成后的重置
    function replay() {
      readTextAudio.value.load();
      word.player = true;
      word.pause = false;
      for (let i = 0; i < text.TextDiv.length; i++) {
        const allDiv = text.TextDiv[i];
        allDiv.style.color = "black";
        if (lang !== "zh") {
          player.listChoose[i].style.color = "#007eff";
        }
      }
      // 当前行
      player.lineNo = 0;
      // 开始滚动行
      player.Cpos = 1;
    }
    let lyric = ref();
    function lineHigh() {
      if (player.lineNo > 0) {
        text.TextDiv[player.lineNo - 1].style.color = "black";
        if (lang !== "zh") {
          player.listChoose[player.lineNo - 1].style.color = "#007eff";
        }
        let top = 50 * player.lineNo;
        ScrollTop(lyric.value, top, 300);
      }
      text.TextDiv[player.lineNo].style.color = "#ffbb18";
      if (lang !== "zh") {
        player.listChoose[player.lineNo].style.color = "#ffbb18";
      }
    }
    //滚动动画
    function ScrollTop(targetElement, number = 0, time) {
      if (!time) {
        targetElement.scrollTop = number;
        return number;
      }
      const spacingTime = 3; // 设置循环的间隔时间  值越小消耗性能越高
      let spacingIndex = time / spacingTime; // 计算循环的次数
      let nowTop = targetElement.scrollTop; // 获取当前滚动条位置
      let everTop = (number - nowTop) / spacingIndex; // 计算每次滑动的距离
      let scrollTimer = setInterval(() => {
        if (spacingIndex > 0) {
          spacingIndex--;
          ScrollTop(targetElement, (nowTop += everTop));
        } else {
          clearInterval(scrollTimer); // 清除计时器
        }
      }, spacingTime);
    }
    // 收起播放条
    let audioBox = ref(null);
    function shouqi() {
      player.shouQi = !player.shouQi;
      if (!player.shouQi) {
        audioBox.value.style.animation = "shouqi 0.5s";
        audioBox.value.style.right = "-43%";
      } else {
        audioBox.value.style.animation = "lakai 0.5s";
        audioBox.value.style.right = "0%";
      }
    }
    // 存入标记点
    function pushPoint() {
      setTimeout(() => {
        for (let i = 0; i < Video.readTexts.length; i++) {
          player.music_point.push(Video.readTexts[i].currentTime);
        }
      },300);
    }
    onMounted(() => {
      setTimeout(() => {
        if (lang !== "zh") {
          player.listChoose = text.list.filter(function (_, i) {
            return i % 2 == 1;
          });
        }
      }, 300);
      readTextAudio.value.addEventListener("ended", () => {
        replay();
      });
      pushPoint();
    });
    // 返回
    function back() {
      router.go(-1);
    }
    return {
      ...toRefs(Video),
      back,
      goto_video,
      pandaHead,
      panda,
      ...toRefs(text),
      ...toRefs(word),
      ...toRefs(player),
      talk_word,
      readTextAudio,
      readAudio,
      fayinchangati,
      shouqi,
      audioBox,
      play_music,
      lyric,
      TextDiv,
      fastForward,
      backMusic,
      list,
    };
  },
};
</script>

<style scoped>
@import "../CommonAsset/css/animation.css";
/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}
.app {
  width: 100%;
  height: 812px;
  overflow-y: scroll;
}
.background {
  position: fixed;
  width: 100%;
  z-index: -1;
}
.header {
  position: fixed;
  width: 100%;
  height: 100px;
  z-index: 3;
  background: url("../CommonAsset/img/read/BG100像素.png") no-repeat;
  background-size: 100%;
}
.back {
  position: absolute;
  top: 20%;
  left: 5%;
  width: 28px;
  height: 28px;
  z-index: 2;
  background: url("../CommonAsset/img/content/返回.png") no-repeat;
}
.panda_head {
  position: absolute;
  top: 15%;
  right: 3%;
  width: 55px;
  height: 39px;
  background: url("../CommonAsset/img/read/信息按钮.png") no-repeat;
}
.title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 286px;
  height: 45px;
}
.content {
  width: 90%;
  height: auto;
  margin: 3% auto;
  background-color: #fcfdeb;
  opacity: 0.8;
  border: 1px solid #cccccc;
  overflow-y: scroll;
}
.lyrics {
  width: 90%;
  margin: 0 auto;
  font-size: 17px;
}
.lyrics > div {
  margin-top: 5%;
}
.lyrics > div:nth-child(2) {
  margin-top: 0;
  color: #007eff;
}
.word {
  margin: 0 auto;
  margin-top: 2%;
  width: 90%;
  height: 150px;
  background-color: #fefef8;
  border: 1px solid #cccccc;
  border-radius: 20px;
}
.word_title {
  display: flex;
  width: 90%;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  font-size: 24px;
  color: #003c90;
  font-family: "宋体";
  border-bottom: 1px solid #cccccc;
}
.word_list {
  width: 90%;
  margin: 0 auto;
  margin-top: 5%;
}
.word_list > li {
  margin-top: 4%;
}
.colorFor {
  color: #3d3d3d;
}
.segmentation {
  width: 100%;
  height: 19px;
  margin: 3% auto;
  background: url("../CommonAsset/img/read/分割竹子.png") no-repeat;
  background-size: 100%;
}
.shengci {
  width: 100%;
  height: 30px;
  text-align: center;
  font-size: 24px;
  color: #080808;
}
.shengciEn {
  text-align: center;
  color: #1a7708;
}
.audioBox {
  position: fixed;
  top: 85%;
  right: 0%;
  z-index: 3;
  width: 200px;
  height: 48px;
  background-color: #080808;
  border-radius: 15px 0 0 15px;
}
.audioPlayer {
  display: flex;
  width: 75%;
  margin-top: 4%;
  margin-left: 20%;
  justify-content: space-between;
  align-items: center;
}
.ListenWord {
  position: relative;
  top: 20%;
  left: 3%;
  width: 24px;
  height: 24px;
  background: url("../CommonAsset/img/read/听读音动画.png") no-repeat;
  animation: player 1s steps(4) infinite;
}
.ListenWord > img {
  position: absolute;
  top: 0%;
  left: 0%;
}
.panda_list {
  position: absolute;
  right: 1%;
  top: 60%;
  width: 70px;
  background-color: white;
  color: #ffbb18;
  text-align: center;
  border-radius: 7px;
  border: 1px solid #cccccc;
  z-index: 5;
}
.panda_list > li:nth-child(1) {
  margin-top: 10%;
}
.panda_list > li {
  position: relative;
  width: 90%;
  margin: 8% auto 0;
  height: 50px;
  border-bottom: 1px solid #cccccc;
}
.panda_list > li > div {
  position: absolute;
  top: 17%;
  left: 17%;
  width: 41px;
  height: 28px;
  line-height: 28px;

  color: #e42c0e;
  font-weight: bold;
  background: url("../CommonAsset/img/read/影片.png");
}
.panda_list > li:nth-child(4) {
  border-bottom: 1px solid #ffffff;
}
.shouqi {
  width: 22px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  position: absolute;
  top: 0%;
  left: 0%;
}
.circle {
  position: absolute;
  top: 22%;
  left: 32%;
  display: block;
  border-radius: 30px;
  background-color: #fce2b8;
  border: 1px solid #e42c0e;
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  color: #e42c0e;
  font-size: 10px;
}

[v-cloak] {
  display: none;
}
</style>
