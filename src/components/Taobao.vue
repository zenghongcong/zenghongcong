<template>
  <div class="taobao">
    <a @click="edit" id="btn-edit" href="javascript:;">编辑</a>
    <div class="base border-row-bottom">
      <div style="padding: 0.32rem 0.28rem 0.16rem;" class="flex j-center">
        <div class="avatar" :class="r0"></div>
        <p id="r1" class="name">{{r1}}</p>
      </div>
      <p id="r2" class="price">{{r2}}</p>
      <p id="r3" class="status fc-888">交易成功</p>
      <ul>
        <li class="flex">
          <span class="fc-a5">付款方式</span>
          <div class="flex">
            <span class="fc-333" id="r3">{{r3}}</span>
            <span class="arrow"></span>
          </div>
        </li>
        <li class="flex">
          <span class="fc-a5">积分奖励</span>
          <div class="flex">
            <span class="fc-333" id="r4">{{r4}}</span>
            <span class="arrow"></span>
          </div>
        </li>
        <li class="flex">
          <span style="width:1.5rem;" class="fc-a5">商品说明</span>
          <span class="fc-333 oe" id="r5">{{r5}}</span>
        </li>
        <li class="flex">
          <span></span>
          <div class="flex">
            <span class="blue">查看订单详情</span>
            <span class="arrow blue"></span>
          </div>
        </li>
        <li class="flex">
          <span class="fc-a5">收货地址</span>
          <span style="text-align:right;" class="fc-333" id="r6">{{r6}}</span>
        </li>
        <li class="flex">
          <span class="fc-a5">物流信息</span>
          <div class="flex">
            <span class="fc-333">已发货</span>
            <span class="arrow"></span>
          </div>
        </li>
      </ul>
      <ul class="border-row">
        <li class="flex">
          <span class="fc-a5">创建时间</span>
          <span class="fc-333" id="r7">{{r7}}</span>
        </li>
        <li class="flex">
          <span class="fc-a5">订单号</span>
          <span class="fc-333" id="r8">{{r8}}</span>
        </li>
        <li class="flex">
          <span style="width:1.5rem;" class="fc-a5">商家订单号</span>
          <span class="fc-333" id="r9">{{r9}}</span>
        </li>
      </ul>
    </div>

    <ul class="after-sale border-row border-row-bottom mt-15">
      <li class="flex">
        <span>账单分类</span>
        <div class="flex">
          <span class="fc-999">{{r10}}</span>
          <span class="arrow"></span>
        </div>
      </li>
      <li class="flex border-row">
        <span>标签和备注</span>
        <div class="flex">
          <span class="fc-999">添加</span>
          <span class="arrow"></span>
        </div>
      </li>
    </ul>

    <ul class="after-sale border-row border-row-bottom mt-15">
      <li class="flex">
        <span>查看往来记录</span>
        <span class="arrow"></span>
      </li>
    </ul>

    <div v-if="show" class="popup">
      <div @click="show = !show" class="mask"></div>
      <div class="inner">
        <ul>
          <li class="flex">
            <span>商铺类型：</span>
            <select v-model="v0">
              <option value="tb">淘宝</option>
              <option value="tm">天猫</option>
            </select>
          </li>
          <li class="flex">
            <span>商铺名称：</span>
            <input v-model="v1" id="v1" type="text" />
          </li>
          <li class="flex">
            <span>付款金额：</span>
            <input v-model="v2" id="v2" type="text" value="-3,000.00" />
          </li>
          <li class="flex">
            <span>当前状态：</span>
            <input v-model="v3" id="v3" type="text" value="交易成功" />
          </li>
          <li class="flex">
            <span>积分奖励：</span>
            <input v-model="v4" id="v4" type="text" />
          </li>
          <li class="flex">
            <span>商品说明：</span>
            <input v-model="v5" id="v5" type="text" />
          </li>
          <li class="flex">
            <span>收货地址：</span>
            <input v-model="v6" id="v6" type="text" value="环市街道迎宾大道中118号江门国际金融大厦19楼中意人寿" />
          </li>
          <li class="flex">
            <span>创建时间：</span>
            <input v-model="v7" id="v7" type="text" value="2019-11-01 15:21" />
          </li>
          <li class="flex">
            <span>订单号：</span>
            <input v-model="v8" id="v8" type="text" />
          </li>
          <li class="flex">
            <span>商家订单号：</span>
            <input v-model="v9" id="v9" type="text" />
          </li>
          <li class="flex">
            <span>账单分类：</span>
            <input v-model="v10" id="v10" type="text" />
          </li>
        </ul>
        <a @click="save" id="btn-save" href="javascript:;">保存</a>
      </div>
    </div>
  </div>
</template>

<script>
import "../../static/assets/rem.js";
import "../../static/assets/reset.css";
import "../../static/assets/base.css";
require("../../static/assets/JsBarcode.all.min.js");
export default {
  name: "Index",
  data() {
    return {
      r0: "tb",
      r1: "gainreel歌瑞尔内衣旗舰店",
      r2: "-3,000.00",
      r3: "广州银行(0942)",
      r4: "2积分",
      r5:
        "歌瑞尔性感收腹提臀中腰内裤女夏季时尚舒适女夏季时尚舒适女夏季时尚舒适",
      r6: "环市街道迎宾大道中118号江门国际金融大厦19楼中意人寿",
      r7: "2019-11-01 15:21",
      r8: "2019110122001136775710578983",
      r9: "T200P690719651732967064",
      r10: "服饰美容",

      v0: "",
      v1: "",
      v2: "",
      v3: "",
      v4: "",
      v5: "",
      v6: "",
      v7: "",
      v8: "",
      v9: "",
      v10: "",

      show: false
    };
  },
  computed: {},
  methods: {
    edit() {
      this.v0 = this.r0;
      this.v1 = this.r1;
      this.v2 = this.r2;
      this.v3 = this.r3;
      this.v4 = this.r4;
      this.v5 = this.r5;
      this.v6 = this.r6;
      this.v7 = this.r7;
      this.v8 = this.r8;
      this.v9 = this.r9;
      this.v10 = this.r10;
      this.show = !this.show;
    },
    save() {
      this.r0 = this.v0;
      this.r1 = this.v1;
      this.r2 = this.v2;
      this.r3 = this.v3;
      this.r4 = this.v4;
      this.r5 = this.v5;
      this.r6 = this.v6;
      this.r7 = this.v7;
      this.r8 = this.v8;
      this.r9 = this.v9;
      this.r10 = this.v10;
      this.show = !this.show;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  max-width: 100%;
}
.j-center {
  justify-content: center;
}
.taobao {
  min-height: 100%;
  background: #f5f5f8;
  font-family: "PingFang SC", Helvetica, "Helvetica Neue", Arial,
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
  color: #000;
}

.taobao .base {
  background: #fff;
}

.taobao .base .avatar {
  flex-shrink: 0;
  width: 0.48rem;
  height: 0.48rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 50%;
}

.taobao .base .avatar.tb {
  background-image: url(../../static/assets/tb.jpg);
}

.taobao .base .avatar.tm {
  background-image: url(../../static/assets/tm.jpg);
}

.taobao .base .name {
  padding-left: 0.16rem;
  text-align: center;
  line-height: 0.48rem;
  font-size: 0.28rem;
}

.taobao .base .price {
  line-height: 0.88rem;
  text-align: center;
  font-size: 0.6rem;
}

.taobao .base .status {
  padding-left: 0.16rem;
  margin-bottom: 0.24rem;
  text-align: center;
  line-height: 0.48rem;
  font-size: 0.26rem;
}

.taobao .base ul {
  margin-left: 0.28rem;
  padding: 0.16rem 0.28rem .18rem 0;
}

.taobao .base ul li {
  justify-content: space-between;
  font-size: 0.27rem;
  padding: .14rem 0;
  line-height: 0.4rem;
}

.taobao .base ul li span {
  display: block;
}
.taobao .base ul li .arrow{
  top: .07rem;
}

.taobao .base ul li > span:first-child {
  flex-shrink: 0;
  width: 1.28rem;
}

.taobao .base .bar-code {
  overflow: hidden;
  margin-top: 0.48rem;
}

.taobao .base .bar-code img {
  max-width: 95%;
  max-height: 1.1rem;
  margin: 0 auto;
}

.taobao .base .bar-code p {
  margin: 0.02rem 0 0.28rem;
  text-align: center;
  letter-spacing: 2px;
  font-size: 0.24rem;
}

.taobao .after-sale {
  background: #fff;
}

.taobao .after-sale li {
  position: relative;
  height: 0.96rem;
  line-height: 0.96rem;
  margin-left: 0.28rem;
  padding-right: 0.28rem;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 0.27rem;
}

.taobao .after-sale .arrow {
  top: 0.35rem;
}

.taobao .flex {
  display: flex;
}

.taobao .border-row,
.taobao .border-row-bottom {
  position: relative;
}

.taobao .border-row:before {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  margin: auto;
  transform: scaleY(0.5);
  background: #dcdcdd;
}
.taobao .border-row-bottom:after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  margin: auto;
  transform: scaleY(0.5);
  background: #dcdcdd;
}

.taobao #btn-edit {
  opacity: 0;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  width: 2rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  color: #fff;
  background-color: #04be02;
  border-radius: 0.1rem;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.4);
}

.taobao .popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
}

.taobao .popup .mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.taobao .popup .inner {
  position: absolute;
  z-index: 13;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 90%;
  height: 11rem;
  padding: 0.4rem 0.2rem;
  margin: auto;
  background: #fff;
  border-radius: 0.2rem;
}

.taobao .popup .inner li {
  margin-bottom: 0.2rem;
}

.taobao .popup .inner li span {
  display: block;
  width: 1.8rem;
  height: 0.6rem;
  line-height: 0.6rem;
}

.taobao .popup .inner li input {
  width: 4.8rem;
  height: 0.6rem;
  padding: 0 0.1rem;
  border: 1px solid #ebebeb;
  margin: 0;
}

.taobao .popup .inner #btn-save {
  display: block;
  width: 80%;
  height: 0.8rem;
  margin: 0.5rem auto 0;
  line-height: 0.8rem;
  text-align: center;
  color: #fff;
  background-color: #04be02;
  border-radius: 0.05rem;
}
.mt-15 {
  margin-top: 0.15rem;
}
.blue {
  color: #408ce2;
}
.arrow {
  position: relative;
  top: 0.21rem;
  flex-shrink: 0;
  width: 0.24rem;
  height: 0.24rem;
  background-image: url(../../static/assets/ar-hui.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.arrow.blue {
  background-image: url(../../static/assets/ar-blue.jpg);
}
.fc-888 {
  color: #888;
}
.fc-a5 {
  color: #a5a5a5;
}
.fc-333 {
  color: #333;
}
.fc-999 {
  color: #999;
}
.oe {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
