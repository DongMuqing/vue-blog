<template>
  <div class="main">
    <a href="https://beian.miit.gov.cn">
        <span class="spa1">
            渝ICP备2023006053号-1
        </span>
    </a>
    <a href="https://qingmumu.xyz">
        <span class="spa2">
            Copyright @ Dongmuqing 2023
        </span>
    </a>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.main{
    display: flex;
    /* 让logo，form，ul水平均分 */
    justify-content: space-between;
    /* 让logo，form，ul垂直均分 */ 
    align-items: center;
    /* 让box-1在box左右居中 */
    height: 100px;
    a{
        margin: auto;
        text-decoration: none;
        span{
            color: var(--span);
        }
    }
    
}
</style>