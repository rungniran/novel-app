<template>
	<div class="DragonHouse">
		<div>
			<div class="title-dragon">ทำเนียบนักรบโลหิตมังกร</div>
		</div>
		<div class="Dragon-con">
				<div class="con-list-dragon">
				<div v-for="item, index in listdragon" :key="index" class="box-list-dragon">
					dfdfdffd
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
			listdragon:[...Array(5).keys()]
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
			background: linear-gradient(180deg, #737192, rgba(97, 83, 142, 0.639) 100%);
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
	border-radius: 10px;
	background: #fff;
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