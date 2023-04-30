<template>
  <div class="center">

    <div class="search">
       <a href=".#"><img src="../assets/img/更多.png" alt=""></a>
        <input type="text" placeholder="文章 | Search">
    </div>

    <div class="individual">
       
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.center{
    width: 590px;
    height: 100vh;
    background-color:rgb(255, 255, 255);
    .search{
        height: 72px;
        a{
          float: left;
          img{
            margin: 20px 20px;
          }
        }
        input{
          margin: 20px 5px;
          border-radius:20px;
          color:#111111;
          font-family:eafont;
          font-size:13px;
          line-height:19.5px;
          padding:5px 15px 5px 52px;
          
        }
    }
    .individual{
        height: 200px;
        background-image: url(../assets/img/102730140_p0.png);
        background-position:
        50% 50%;
        background-size:
        cover;
        color:
        #404040;
        line-height:
        24px;
    }
}
</style>