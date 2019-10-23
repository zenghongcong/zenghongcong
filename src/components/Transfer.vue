<template>
  <div class="wechat">
    <a @click="edit" id="btn-edit" href="javascript:;">编辑</a>
    <div class="base">
      <div class="avatar"></div>
      <p id="r1" class="name">{{r1}}</p>
      <p id="r2" class="price">{{r2}}</p>
      <ul class="border-row">
        <li class="flex">
          <span>当前状态</span>
          <span id="r3">{{r3}}</span>
        </li>
        <li class="flex">
          <span>收款方备注</span>
          <span id="r4">{{r4}}</span>
        </li>
        <li class="flex">
          <span>支付方式</span>
          <span id="r5">{{r5}}</span>
        </li>
        <li class="flex">
          <span>转账时间</span>
          <span id="r6">{{r6}}</span>
        </li>
        <li class="flex">
          <span>转账单号</span>
          <span id="r7">{{r7}}</span>
        </li>
      </ul>
    </div>
    <ul class="after-sale border-row">
      <li class="flex">
        <span>发起群收款</span>
        <span></span>
      </li>
      <li class="flex border-row">
        <span>联系收款方</span>
        <span></span>
      </li>
      <li class="flex border-row">
        <span>对订单有疑惑</span>
        <span></span>
      </li>
      <li class="flex border-row">
        <span>常见问题</span>
        <span></span>
      </li>
    </ul>

    <div v-if="show" class="popup">
      <div @click="show = !show" class="mask"></div>
      <div class="inner">
        <ul>
          <li class="flex">
            <span>图标：</span>
            <input v-model="v0" id="v0" type="text" placeholder="填图标链接" />
          </li>
          <li class="flex">
            <span>收款方信息：</span>
            <input v-model="v1" id="v1" type="text" />
          </li>
          <li class="flex">
            <span>付款金额：</span>
            <input v-model="v2" id="v2" type="number" />
          </li>
          <li class="flex">
            <span>当前状态：</span>
            <input v-model="v3" id="v3" type="text" />
          </li>
          <li class="flex">
            <span>收款方备注：</span>
            <input v-model="v4" id="v4" type="text" />
          </li>
          <li class="flex">
            <span>支付方式：</span>
            <input v-model="v5" id="v5" type="text" />
          </li>
          <li class="flex">
            <span>转账时间：</span>
            <input v-model="v6" id="v6" type="text" />
          </li>
          <li class="flex">
            <span>转账单号：</span>
            <input v-model="v7" id="v7" type="text" />
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
      // r0: localStorage.getItem("imgLink") || "../../static/assets/transfer.jpg",
      r1: localStorage.getItem("shopName") || "扫二维码付款-给蓬江区顺风租车店",
      r2: localStorage.getItem("price") || "-600.00",
      r3: localStorage.getItem("status") || "支付成功",
      r4: localStorage.getItem("goods") || "二维码收款",
      r5: localStorage.getItem("shopNameAll") || "零钱",
      r6: localStorage.getItem("payTime") || "2018-12-19 18:24:45",
      r7: localStorage.getItem("payWay") || "10000499012019102300120447892271",

      v0: "",
      v1: "",
      v2: "",
      v3: "",
      v4: "",
      v5: "",
      v6: "",
      v7: "",

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
      this.show = !this.show;
    },
    save() {
      localStorage.setItem("imgLink", this.v0);
      localStorage.setItem("shopName", this.v1);
      localStorage.setItem("price", this.v2);
      localStorage.setItem("status", this.v3);
      localStorage.setItem("goods", this.v4);
      localStorage.setItem("shopNameAll", this.v5);
      localStorage.setItem("payTime", this.v6);
      localStorage.setItem("payWay", this.v7);
      this.r0 = this.v0;
      this.r1 = this.v1;
      this.r2 = this.v2;
      this.r3 = this.v3;
      this.r4 = this.v4;
      this.r5 = this.v5;
      this.r6 = this.v6;
      this.r7 = this.v7;
      this.show = !this.show;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.wechat {
  min-height: 100%;
  background: #f8f8f8;
  font-family: "PingFang SC", Helvetica, "Helvetica Neue", Arial,
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
}

.wechat .base {
  background: #fff;
  padding: 0.5rem 0 0.6rem;
  margin-bottom: 0.14rem;
}

.wechat .base .avatar {
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 auto;
  background-image: url(../../static/assets/transfer.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 50%;
}

.wechat .base .name {
  line-height: 1.5;
  text-align: center;
  padding: 0 0.5rem;
  margin-top: 0.36rem;
  font-size: 0.28rem;
  color: #000;
}

.wechat .base .price {
  text-align: center;
  margin-top: 0.24rem;
  font-size: 0.46rem;
  color: #000;
  font-weight: 700;
}

.wechat .base ul {
  overflow: hidden;
  width: 6.3rem;
  margin: 0.82rem auto 0;
  padding: 0.26rem 0 0;
}

.wechat .base ul li {
  margin-top: 0.14rem;
  font-size: 0.24rem;
  color: #353535;
  line-height: 1.5;
}

.wechat .base ul li span {
  display: block;
}

.wechat .base ul li span:first-child {
  width: 1.38rem;
  color: #888;
}

.wechat .base ul li span:last-child {
  width: 4.7rem;
}

.wechat .base .bar-code {
  overflow: hidden;
  margin-top: 0.48rem;
}

.wechat .base .bar-code img {
  max-width: 95%;
  max-height: 1.1rem;
  margin: 0 auto;
}

.wechat .base .bar-code p {
  margin: 0.02rem 0 0.28rem;
  text-align: center;
  letter-spacing: 2px;
  font-size: 0.24rem;
  color: #000;
}

.wechat .after-sale {
  padding: 0 0.45rem;
  background: #fff;
}

.wechat .after-sale.border-row:before {
  top: initial;
  bottom: 0;
}

.wechat .after-sale li {
  position: relative;
  height: 1.1rem;
  line-height: 1.1rem;
  padding: 0 0.15rem;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 6.6rem;
  margin: 0 auto;
  font-size: 0.24rem;
  color: #353535;
}

.wechat .after-sale li:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 0.48rem;
  height: 0.48rem;
  margin: auto;
  background: url(../../static/assets/arrow3.png) no-repeat;
  background-size: 100% 100%;
  transform: rotate(-90deg);
}

.wechat .after-sale li span:last-child {
  margin-right: 0.3rem;
  color: #c3c3c3;
}

.wechat .flex {
  display: flex;
}

.wechat .border-row {
  position: relative;
}

.wechat .border-row:before {
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
  background: #e5e5e5;
}

.wechat #btn-edit {
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

.wechat .popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
}

.wechat .popup .mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.wechat .popup .inner {
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

.wechat .popup .inner li {
  margin-bottom: 0.2rem;
}

.wechat .popup .inner li span {
  display: block;
  width: 1.8rem;
  height: 0.6rem;
  line-height: 0.6rem;
}

.wechat .popup .inner li input {
  width: 4.5rem;
  height: 0.6rem;
  padding: 0 0.1rem;
  border: 1px solid #ebebeb;
  margin: 0;
}

.wechat .popup .inner #btn-save {
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
</style>
