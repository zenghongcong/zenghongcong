<template>
	<div class="music">
		<audio ref="audio" @timeupdate="musicTimeUpdate" @canplay="musicCanPlay" @ended="musicEnded"></audio>
		<div class="mask-bg" style="background-image: url(../../static/images/20160217155352_Nfxnu.thumb_02.png)"></div>
		<header>
			<p class="name">{{song.name}}</p>
			<p class="singer">{{song.singer}}</p>
		</header>
		<div class="content">
			<div class="cd">
				<div class="line">
					<div :class="!playStatus ? 'animate' : ''" class="triger"></div>
				</div>
				<div ref="coverWrap" class="cover-wrap">
					<div ref="cover" :class="playStatus ? 'animate' : ''" class="cover">
						<div class="cd-bg"></div>
						<img class="cover-img" :src="song.img" />
					</div>
				</div>
			</div>
			<div class="souvenir">
				<p>一切都来得刚刚好</p>
				<p class="time">{{time}}</p>
			</div>
		</div>
		<footer>
			<div class="range-wrap">
				<div class="range">
					<span class="already">{{pastTime}}</span>
					<div class="duration">
						<span :style="{ width: progress + '%' }" class="currentProgress"></span>
						<span :style="{ left: progress + '%' }" class="ball"></span>
					</div>
					<span class="total">{{totalTime}}</span>
				</div>
			</div>
			<div class="musicCtrl">
				<i @click="switchPattern" :class="{'icon-music-shunxu': pattern == 1,'icon-music-random': pattern == 2,'icon-music-danqu1': pattern == 3}" class="playType"></i>
				<i @click="switchSong(2)" class="prev icon-prevdetail"></i>
				<i @click="togglePlay" :class="playStatus ? 'icon-pause-detail' : 'icon-playdetail'" class="playPause"></i>
				<i @click="switchSong(1)" class="next icon-nextdetail"></i>
				<i @click="toggleMusicList" class="menu icon-list-music"></i>
			</div>
		</footer>

		<div class="music-list">
			<transition name="sideUp">
				<div v-show="showList" class="list-content">
					<div class="title">
						<div class="play-type">
							<i :class="{'icon-music-shunxu': pattern == 1,'icon-music-random': pattern == 2,'icon-music-danqu1': pattern == 3}"></i>
							<span>{{patternText[pattern]}}</span>
							<span>({{songList.length}})</span>
						</div>
						<div class="border-1px"></div>
					</div>
					<ul class="container">
						<li @click="selectSong(idx)" :class="{active: index == idx}" v-for="(item, idx) in songList">
							<i class="playingicon icon-volume-medium"></i>
							<span class="name">{{item.name}}</span>
							<span class="singer"> - {{item.singer}}</span>
							<div class="border-1px"></div>
						</li>
					</ul>
				</div>
			</transition>
			<transition name="fade">
				<div v-show="showList" @click="toggleMusicList" class="mask"></div>
			</transition>
		</div>

		<div v-if="!loaded" class="loading">
			<div class="box">
				<div class="line">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import '../../static/css/font.css'
var songList = [
	{
		"name": "The Right Path",
		"singer": "Thomas Greenberg",
		"url":"/static/data/Thomas Greenberg - The Right Path.mp3",
		"img": "http://p1.music.126.net/_Nzg2JzIjaBy38rSSdfFig==/851021999952100.jpg?param=300y300"
	},
	{
		"name": "刚好遇见你",
		"singer": "李玉刚",
		"url":"/static/data/李玉刚 - 刚好遇见你.mp3",
		"img": "http://p1.music.126.net/lDyytkTaPYVTb1Vpide6AA==/18591642115187138.jpg?param=300y300"
	},
	{
		"name": "都选C",
		"singer": "董成鹏",
		"url":"/static/data/大鹏 - 都选C.mp3",
		"img": "http://p1.music.126.net/FCvXiE-OndiMDYUkaXDK1w==/109951163029337837.jpg?param=300y300"
	},
	{
		"name": "爱的故事(上)",
		"singer": "孙耀威",
		"url":"/static/data/孙耀威 - 爱的故事(上).mp3",
		"img": "http://p1.music.126.net/xKKcN1WJZwqKk1VBZhtMvA==/67070209310501.jpg?param=300y300"
	},
	{
		"name": "追光者",
		"singer": "岑宁儿",
		"url":"/static/data/岑宁儿 - 追光者.mp3",
		"img": "http://p1.music.126.net/ZZAQGWl9mR7g5xCyWWH3Pw==/19149094509535913.jpg?param=300y300"
	},
	{
		"name": "好想你",
		"singer": "朱主爱",
		"url":"/static/data/朱主爱 - 好想你.mp3",
		"img": "http://p1.music.126.net/8FNnsbZO2R7gTiU1O8oIWw==/3383197285041412.jpg?param=300y300"
	},
	{
		"name": "一瞬间",
		"singer": "丽江小倩",
		"url":"/static/data/丽江小倩 - 一瞬间.mp3",
		"img": "http://p1.music.126.net/nMSY-bfEgRMKo020tcZkZA==/31885837220938.jpg?param=300y300"
	},
	{
		"name": "追梦赤子心",
		"singer": "GALA",
		"url":"/static/data/GALA - 追梦赤子心.mp3",
		"img": "http://p1.music.126.net/XDncptlBJ4_LN3hLBx-8aw==/19061133579343591.jpg?param=300y300"
	},
	{
		"name": "十指紧扣",
		"singer": "张智霖",
		"url":"/static/data/张智霖 - 十指紧扣.mp3",
		"img": "http://p1.music.126.net/Bt-48siHvx6KAlWi5N7WBw==/125344325584438.jpg?param=300y300"
	},
	{
		"name": "塑料袋",
		"singer": "乔杉",
		"url":"/static/data/乔杉 - 塑料袋.mp3",
		"img": "http://p1.music.126.net/Bw30uQ8MVANtLBn4C-OGWQ==/109951163035595789.jpg?param=300y300"
	}
];
export default {
  name: 'Index',
  data () {
    return {
      songList: songList,
      song: {
      	name: '',
      	singer: '',
      	url: '',
      	img: ''
      },
      patternText:{
      	1: '列表循环',
      	2: '随机播放',
      	3: '单曲循环'
      },
      pattern: 1, //播放模式 -- 1：列表循环 2：随机播放 3：单曲循环
      playStatus: false,
      loaded: false,
      index: Math.ceil(Math.random()*(songList.length-1)),
      time: '我们在一起已经' + Math.ceil((Date.now() - Date.parse(' Mar 04,2017'))/(24 * 60 * 60 * 1000)) + '天啦~',
      duration: 0,
      totalTime: '00:00',
      pastTime: '00:00',
      progress: 0,
      showList: false,
    }
  },
  computed: {
  	
  },
  created(){
  	this.$nextTick(function(){
  		this.setSong();
  		this.loaded = true;
  	},200);
  },
  methods: {
  	musicTimeUpdate(){
  		var time = Math.floor(this.$refs.audio.currentTime),
			m = Math.floor(time/60),
			s = time%60;
		this.pastTime = (m < 10 ? '0'+m : m) + ':' + (s < 10 ? '0'+s : s);
  		this.progress = (time/this.duration)*100;
  	},
  	musicCanPlay(){
  		this.duration = Math.floor(this.$refs.audio.duration);
  		var m = Math.floor(this.duration/60),
					s = this.duration%60;
			this.totalTime = (m < 10 ? '0'+m : m) + ':' + (s < 10 ? '0'+s : s);
  	},
  	musicEnded(){
  		this.switchSong(1);
  	},
  	setSong(){
  		this.song = songList[this.index];
  		this.$refs.audio.setAttribute('src', this.song.url);
  		this.$refs.audio.load();
  		this.playStatus = false;
  	},
  	switchSong(type){
  		var total = songList.length;
  		if(this.pattern == 1){
  			if(type == 1){
				if(this.index == total - 1){
					this.index = 0;
				}else{
					this.index += 1;
				}
			}else{
				if(this.index == 0){
					this.index = total - 1;
				}else{
					this.index -= 1;
				}
			}
  		}else if(this.pattern == 2){
  			this.index = Math.ceil(Math.random()*(total-1));
  		}
		this.setSong();
		this.togglePlay();
  	},
  	togglePlay(){
		if(!this.playStatus){
			this.$refs.audio.play();
			this.playStatus = true;
		}else{
			this.setTransForm();
			this.$refs.audio.pause();
			this.playStatus = false;
		}
	},
	setTransForm(){
		var coverTrans = getComputedStyle(this.$refs.cover).transform,
			coverWrapTrans = getComputedStyle(this.$refs.coverWrap).transform;
		this.$refs.coverWrap.style.transform = coverWrapTrans === 'none' ? coverTrans : coverTrans.concat('', coverWrapTrans);
	},
	toggleMusicList(){
		this.showList = !this.showList
	},
	selectSong(idx){
		if(this.playStatus && this.index == idx){
			return this.toggleMusicList();
		}
		this.index = idx;
		this.setSong();
		this.togglePlay();
		this.toggleMusicList();
	},
	switchPattern(){
		if(this.pattern == 3){
			this.pattern = 1;
		}else{
			this.pattern++;
		}
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*重设浏览器样式*/
*{ box-sizing: border-box; -webkit-box-sizing: border-box; }
a, body, div,
header, html, img,
p, span, ul{ border: none; margin: 0;padding: 0; border: 0;outline:0; -webkit-text-size-adjust: none; -webkit-tap-highlight-color: rgba(0,0,0,0); }
html, body{ line-height: 1; height: 100%; font-family: "microsoft yahei"; background: #aaa; }
			
.mask-bg{ position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-size: cover !important; background-position: center center !important; -webkit-filter: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiP…vbj0iMTAiIC8+DQogICAgICAgIDwvZmlsdGVyPg0KICAgIDwvZGVmcz4NCjwvc3ZnPg==#blur); filter: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiP…vbj0iMTAiIC8+DQogICAgICAgIDwvZmlsdGVyPg0KICAgIDwvZGVmcz4NCjwvc3ZnPg==#blur); -webkit-filter: blur(30px); filter: blur(30px); }
			
header{ position: absolute; top: 0; left: 0; height: 10vh; padding: 1vh 50px 0 50px !important; }
header .name, header .singer{ margin: 0; color: #fff; font-size: 14px; padding: 4px 0; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }

.content{ position: absolute; top: 10vh; left: 0; bottom: 20vh; right: 0; overflow: hidden; }
.content .cd .line{ width: 80%; height: 1px; background-image: linear-gradient(270deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.6),hsla(0,0%,100%,0)); margin: 0 auto; }
.content .cd .line .triger{ position: absolute; top: -14px; left: 50%; -webkit-transform: translate3d(-16px,0,0); transform: translate3d(-16px,0,0); width: 90px; height: 140px; background-image: url(/static/images/swith.png); background-size: cover; -webkit-transform-origin: 14px 16px; transform-origin: 14px 16px; transition: all .3s; z-index: 5; }
.content .cd .line .triger.animate{ -webkit-transform: translate3d(-16px,0,0) rotate(-30deg); transform: translate3d(-16px,0,0) rotate(-30deg); }
.content .cd .cover{ width: 44vh; height: 44vh; position: relative; margin: 0 auto; margin-top: 70px; }
.content .cd .cover.pause{ -webkit-animation-play-state: paused; animation-play-state: paused; }
.content .cd .cover.animate{
	-webkit-animation-name: goRotate;
	-webkit-animation-duration: 16s;
	-webkit-animation-timing-function: linear;
	-webkit-animation-iteration-count: infinite;
	-webkit-animation-delay: .1s;
	animation-name: goRotate;
	animation-duration: 16s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	animation-delay: .1s;
}
.content .cd .cover .cd-bg{ width: 44vh; height: 44vh; position: absolute; top: 0; left: 50%; -webkit-transform: translate3d(-50%,0,0); transform: translate3d(-50%,0,0); background: url(/static/images/cd-mine.png); background-size: 100%; z-index: 2; }
.content .cd .cover img{ position: absolute; display: block; width: 28vh; height: 28vh; top: 8vh; transition: all .3s; left: 50%; -webkit-transform: translate3d(-50%,0,0); transform: translate3d(-50%,0,0); z-index: 1; }
.content .souvenir{ margin-top: 1.5vh; font-size: 16px; color: #fff; text-align: center; }
.content .souvenir p{ padding: 4px 0; }

footer{ position: absolute; bottom: 0; left: 0; right: 0; height: 18vh; color: #fff; background-image: linear-gradient(0deg,rgba(0,0,0,.8),rgba(0,0,0,.4),transparent,transparent); }
footer .range-wrap{ height: 6vh; }
footer .range-wrap .range{ display: -webkit-box; -webkit-box-align: center; align-items: center; display: flex; width: 90%; height: 100%; margin: 0 auto; padding: 0 10px; }
footer .range-wrap .range .already{ font-size: 12px; color: hsla(0,0%,100%,.8); margin-right: 10px; }
footer .range-wrap .range .total{ font-size: 12px; color: hsla(0,0%,100%,.8); margin-left: 10px; }
footer .range-wrap .range .duration{ -webkit-box-flex: 1; flex: 1; height: 2px; border-radius: 1px; background: hsla(0,0%,96%,.3); margin: 0 auto; font-size: 0; cursor: pointer; position: relative; }
footer .range-wrap .range .duration .currentProgress{ display: inline-block; width: 0; height: 2px; float: left; background: #c62f2f; }
footer .range-wrap .range .duration .ball{ position: absolute; left: 0; width: 16px; height: 16px; margin-left: -7px; margin-top: -7px; background: #fff; border-radius: 50%; cursor: pointer; }

footer .musicCtrl{ height: 12vh; width: 100%; display: flex; align-items: center; justify-content: center; font-size: 0 }
footer .musicCtrl i{ display: inline-block; font-size: 28px; width: 20vw; height: 50px; line-height: 50px; text-align: center; }
footer .musicCtrl i.playPause{ font-size: 46px; }
footer .musicCtrl i.playType, footer .musicCtrl i.menu{ font-size: 20px; color: #e1e1e1; }

.music-list{  }
.music-list .list-content{ position: fixed; height: 314px; background: #fff; bottom: 0; left: 0; right: 0; z-index: 23; }
.music-list .list-content .title{ width: 100%; position: relative; height: 50px; font-size: 0; }
.music-list .list-content .title .play-type{ display: inline-block; width: auto; height: 100%; line-height: 50px; padding: 0 15px; }
.music-list .list-content .title .play-type i{ color: #666; font-size: 18px; display: inline-block; width: 20px; height: 20px; vertical-align: middle; }
.music-list .list-content .title .play-type span{ padding: 0 2px; color: #666; vertical-align: middle; font-size: 14px; font-weight: 300; }
.music-list .list-content .title .border-1px{ position: relative; }
.music-list .list-content .title .border-1px:after{ display: block; position: absolute; left: 0; bottom: 0; width: 100%; border-top: 1px solid rgba(7,17,27,.1); content: " "; -webkit-transform: scaleY(.5); transform: scaleY(.5); }
.music-list .list-content .container{ height: calc(100% - 50px); margin: 0; padding: 0; overflow: scroll; -webkit-overflow-scrolling: touch; padding: 6px 0; }
.music-list .list-content .container li{ margin: 0; padding: 0; list-style: none; height: 42px; line-height: 42px; padding: 0 15px; font-weight: 400; font-size: 14px; color: #666; overflow: hidden; }
.music-list .list-content .container li:active{ opacity: .6; }
.music-list .list-content .container li .playingicon{ display: none; font-size: 14px; vertical-align: middle; color: #c62f2f; }
.music-list .list-content .container li.active .playingicon{ display: inline-block; }
.music-list .list-content .container li .border-1px{ position: relative; }
.music-list .list-content .container li .border-1px:after{ display: block; position: absolute; left: 0; bottom: 0; width: 100%; border-top: 1px solid rgba(7,17,27,.1); content: " "; }
.music-list .mask{ position: fixed; top: 0; left: 0; bottom: 0; right: 0; z-index: 21; background: rgba(0,0,0,.5); }

.mask.fade-enter-to,.mask.fade-leave-to{
	transition: all 0.3s;
}
.mask.fade-enter,.mask.fade-leave-to{
	opacity: 0;
}
.music-list .list-content.sideUp-enter-to,.music-list .list-content.sideUp-leave-to{
	transition: transform 0.3s;
}
.music-list .list-content.sideUp-enter,.music-list .list-content.sideUp-leave-to{
	transform: translate3d(0,100%,0);
}

/*加载动画*/
.loading{ position: fixed; z-index: 9999; top: 0; left: 0; width: 100%; height: 100%; background: #fff; }
.loading .box{ position: absolute; top: -2rem; left: 0; bottom: 0; right: 0; width: 100px; height: 100px; margin: auto; border-radius: 6px; -webkit-border-radius: 6px; background: rgba(0,0,0,.6); }
.loading .box .line{ position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 36px; height: 36px; margin: auto; }
.loading .box .line div{ position: absolute; left: 16px; top: 0; width: 2px; height: 36px; }
.loading .box .line div:before,.loading .box .line div:after{position:absolute;content:'';display:block;width:2px;height:25%;background:#fcfcfc;border-radius:5px;}
.loading .box .line div:before{ top: 0; }
.loading .box .line div:after{ bottom: 0; }
.loading .box .line div:nth-child(2){-webkit-transform:rotate(30deg);}
.loading .box .line div:nth-child(3){-webkit-transform:rotate(60deg);}
.loading .box .line div:nth-child(4){-webkit-transform:rotate(90deg);}
.loading .box .line div:nth-child(5){-webkit-transform:rotate(120deg);}
.loading .box .line div:nth-child(6){-webkit-transform:rotate(150deg);}

.loading .box .line div:nth-child(1):before{-webkit-animation:load 1.2s linear 0s infinite;}
.loading .box .line div:nth-child(2):before{-webkit-animation:load 1.2s linear 0.1s infinite;}
.loading .box .line div:nth-child(3):before{-webkit-animation:load 1.2s linear 0.2s infinite;}
.loading .box .line div:nth-child(4):before{-webkit-animation:load 1.2s linear 0.3s infinite;}
.loading .box .line div:nth-child(5):before{-webkit-animation:load 1.2s linear 0.4s infinite;}
.loading .box .line div:nth-child(6):before{-webkit-animation:load 1.2s linear 0.5s infinite;}
.loading .box .line div:nth-child(1):after{-webkit-animation:load 1.2s linear 0.6s infinite;}
.loading .box .line div:nth-child(2):after{-webkit-animation:load 1.2s linear 0.7s infinite;}
.loading .box .line div:nth-child(3):after{-webkit-animation:load 1.2s linear 0.8s infinite;}
.loading .box .line div:nth-child(4):after{-webkit-animation:load 1.2s linear 0.9s infinite;}
.loading .box .line div:nth-child(5):after{-webkit-animation:load 1.2s linear 1s infinite;}
.loading .box .line div:nth-child(6):after{-webkit-animation:load 1.2s linear 1.1s infinite;}

@-webkit-keyframes load{
    0%{opacity: 0;}
    100%{opacity: 1;}
}

@keyframes goRotate{
	from{
		transform: rotate(0)
	}
	to{
		transform: rotate(360deg)
	}
}
  .music{ height: 100%; }
</style>
