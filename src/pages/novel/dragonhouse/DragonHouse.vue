<template>
	<div class="DragonHouse">
		<div>
			<div class="title-dragon">ทำเนียบนักรบโลหิตมังกร</div>
		</div>
		<div class="Dragon-con">
				<div class="con-list-dragon">
					
				<div v-for="item, index in listdragon" :key="index" class="box-list-dragon">
					<span class="glowing-text">{{item}}</span>
				</div>
			</div>
			<div class="con-dragon-img">
				<img :src="$path.image('dragon.png')" class="img-dragon">
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name:"DragonHouse",
	data(){
		return{
			listdragon:[
				"tab-jomkun",
				"Puri Tika",
				"The Maker By the",
				"Chanchai Junlouch...",
				"Pasin Tansakul"
			]
		}
	}	
})
</script>
<style lang="scss" scoped>
@font-face {
	font-family: "EDMuzazhi";
	src: url(/fonts/EDMuzazhi.ttf);
}
.DragonHouse{
	height: 100%;
    	padding: 20px 35px;
			padding-bottom: 50px;
			
    background: linear-gradient( 181deg, rgba(100, 91, 124, 1) 0%, rgba(159, 149, 187, 1) 47%, rgba(231, 226, 244, 1) 100% );

}
.glowing-text {
  font-size: 25px;
  color: #f5d797;
  text-align: center;
  -webkit-animation: glowing-text 1.4s ease-in-out infinite alternate;
  -moz-animation: glowing-text 1.4s ease-in-out infinite alternate;
  animation: glowing-text 1.4s ease-in-out infinite alternate;
}
@-webkit-keyframes glowing-text {
  0% {
    text-shadow: 0 0 2px #fff, 0 0 5px #da7807, 0 0 10px #da7807, 0 0 15px #ffb24d, 0 0 20px #ffb24d, 0 0 25px #ffb24d, 0 0 30px #ffb24d;
}
  
  100% {
    text-shadow: 0 0 2px #fff, 0 0 5px #f81f4e, 0 0 10px #f81f4e, 0 0 15px #eb8e37, 0 0 20px #da7807, 0 0 25px #ffb24d, 0 0 30px #ffb24d;
  }
}
.img-dragon{
	height: 400px;
	
}
.title-dragon{
color: #fff;

font-size: 30px;

}
.Dragon-con{
	display: grid;
	grid-template-columns: 1fr 1fr;	
	margin-top: 15px;
	
}
.con-list-dragon{
	display: grid;
	grid-gap: 20px;
}

.box-list-dragon{
	padding: 20px 20px;
	border-radius: 40px;
	background: #fff;
	border: 2px solid #f1925b;
}
.con-dragon-img{
	display: flex;
	justify-content: center;
}
@media (max-width: 415px) {
	.con-dragon-img{
    display: none;
	}.Dragon-con {
    grid-template-columns: 1fr;
}
.DragonHouse{
  padding: 20px 5px;
	padding-bottom: 50px;
}
.box-list-dragon{
	// background: #5f5c7f;
	background-color: white;
}
.title-dragon{
   font-size: 20px;
	 text-align: center;
}
}

</style>