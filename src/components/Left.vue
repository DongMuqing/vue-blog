<template>
  <div class="left">
    <div class="logo">
       <img src="../assets/logo.png" alt="">
    </div>

    <div class="nav">
        <ul>
            <li>
                <img src="../assets/img/主页.png" alt=""><span>首页</span>
            </li>
            <li>
                <img src="../assets/img/主页.png" alt=""><span>首页</span>
            </li>
            <li>
                <img src="../assets/img/主页.png" alt=""><span>首页</span>
            </li>
            <li>
                <img src="../assets/img/主页.png" alt=""><span>首页</span>
            </li>
            <li>
                <img src="../assets/img/主页.png" alt=""><span>首页</span>
            </li>
            <li>
                <img src="../assets/img/主页.png" alt=""><span>首页</span>
            </li>
        </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
.left{
    width: 295px;
    height: 100vh;
    background-color:rgb(246, 247, 255);
    .logo{
        height: 78px;
        img{
            width: 70px;
            height: 70px;
            border-radius: 2px;
            margin: 10px 50px;
        }
    }
    .nav{
        height: 392px;
        line-height: 24px;
        margin: 20px 0px;
        padding: 0px 40px 20px;
        ul{
            line-height:24px;
            margin:20px 0px;
            padding:0px 40px 20px;
            li{
                list-style: none;
                align-items:
                center;
                border-radius:
                12px;
                box-shadow:
                #000000 0px 0px 0px 0px;
                display:
                flex;
                font-family:
                eafont;
                justify-content:
                flex-start;
                line-height:
                24px;
                margin:
                0px 0px 5px;
                padding:
                12px 15px;
                text-align:
                left;
                span{
                    line-height:36px;
                    text-align:left;
                    margin-left: 10px;
                    padding-top: 5px;
                    font-family: 微软雅黑;
                    font-size: 2;
                }
            }
        }
    }
}
</style>>

