<template>
    <div class="lunbo-point-tab">
        <el-carousel :interval="6000" type="card" height="200px">
            <el-carousel-item v-for="(backdrop, index) in backdrops" :key="backdrop.id" v-show="index === selectedBackdropIndex">
               <li><img :src="backdrop.url" alt=""></li>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import backdrops from '@/api/backdrop';
export default {
    data() {
        return {
            backdrops: [
                {
                    id: '',
                    url: ''
                }
            ],
            selectedBackdropIndex: 0,
        }
    },
    methods:{
        fetchBackdrops() {
      backdrops.getBackdrops()
        .then(response => {
          // 处理接口返回的数据
          this.backdrops = response.data.data;
        })
        .catch(error => {
          // 处理错误
        });
    },
    },
    mounted(){
        this.fetchBackdrops()
    }
}
</script>
<style lang="less" scoped>
.lunbo-point-tab {

    text-align: center;
}

.el-carousel--card {
    overflow-x: visible;
}

.lunbo-point-tab .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.lunbo-point-tab .el-carousel__item:nth-child(2n) {
    background-color: #42b983;
}

.lunbo-point-tab .el-carousel__item:nth-child(2n+1) {
    background-color: #abcdef;
}

.lunbo-point-tab .el-carousel__indicator--horizontal.is-active::after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background: red;
    transform: scaleX(0);
    animation: progress 6s linear 0s infinite;
    transform-origin: left;
    margin-top: -2px;
}

@keyframes progress {
    0% {
        transform: scaleX(0);
    }

    to {
        transform: scaleX(1);
    }
}
li {
    list-style: none;

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      /* 图片适应容器的尺寸，并保持比例 */
    }
  }
</style>

