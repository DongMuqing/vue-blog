<!-- <template>
  <div class="main">
    准备一个容器用来存放音乐播放器 -->
    <!-- <div id="aplayer"></div>
  </div>
</template>  -->

<!-- <script>
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';// 引入音乐插件的样式
export default {
  data() {
    return {
      audio: [ // 歌曲列表
        {
          name: "还山", // 歌曲名字
          artist: "无边界音乐", // 歌曲演唱者
          url: "http://m10.music.126.net/20230614163015/077b3bdd7061009dc803b10f1685b7b5/ymusic/5032/34d5/e0fe/b0523cc659d08a393d3662ee586c5b4f.mp3",
          cover: "http://p1.music.126.net/2bepi13lhHf8qVDoHGPJUg==/109951163734122907.jpg?param=130y130", // 歌曲头像
          lrc: "[00:00.00] 暂无歌词", // 歌词
          theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色
        },
      ],
      info: {
        fixed: false, // 不开启吸底模式
        listFolded: true, // 折叠歌曲列表
        autoplay: false, // 开启自动播放
        preload: "auto", // 自动预加载歌曲
        loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "list", //  播放模式，list列表播放, random随机播放
      },
    };
  },
  mounted() {
    // 初始化播放器
    this.initAudio();
  },
  methods: {
    initAudio() {
      // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
      const ap = new APlayer({
        container: document.getElementById("aplayer"),
        audio: this.audio, // 音乐信息
        ...this.info, // 其他配置信息
      });
    },
  },
};
</script> -->

<!-- <style lang="less" scoped>
 .main {
 
  height: 100%;
  padding: 50px;
  #aplayer {
    width: 430px; // 定个宽度
  }
}
</style> -->
