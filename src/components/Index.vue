<template>
	<div class="music">
		<audio ref="audio" @timeupdate="musicTimeUpdate" @canplay="musicCanPlay" @ended="musicEnded"></audio>
		<div class="mask-bg" style="background-image: url(http://oiq8j9er1.bkt.clouddn.com/music_%E6%88%91%E8%BF%98%E6%83%B3%E5%A5%B9.jpg);"></div>
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
				<i class="playType icon-music-shunxu"></i>
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
							<i class="icon-music-shunxu"></i>
							<span>列表循环</span>
							<span>(5)</span>
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
	}
]
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
  	});
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
  		this.switchSong();
  	},
  	setSong(){
  		this.song = songList[this.index];
  		this.$refs.audio.setAttribute('src', this.song.url);
  		this.$refs.audio.load();
  		this.playStatus = false;
  	},
  	switchSong(type){
  		var total = songList.length;
		if(type == total-1){
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
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .music{ height: 100%; }
</style>
