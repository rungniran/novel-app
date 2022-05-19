<template>
	<div class="CheerUp">
		<div class="haeder">
			<div class="title">ส่งกำลังใจ</div>
			<div class="nv-btn-yellow" @click="$base.openmodal('modal-xl', 'modal-animation', 0)">ส่งกำลังใจ</div>
		</div>
		<div class="con-cheerup">
			<div class="con-list-cheerup">
				<div  v-for="item, index in CheerUp" :key="index" class="box-list-cheerup">
					<!-- <div class="profile">
						  <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width="100%">
					</div> -->
					<div :class="'name-profile raking'+(index+1)">
						eererer
					</div>
				</div>
			</div>
			<div class="animou-img">
				<img :src="$path.image('Teen2 1.png')" >
			</div>
		</div>
		<ModalCheerUp/>
	</div>
</template>\
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name:"CheerUp"	,
	data(){
		return{
			CheerUp:[...Array(5).keys()]
		}
	},
	components:{
		ModalCheerUp:()=>import("./modalcheerup/Modelcheerup.vue")
	}
})
</script>
<style lang="scss" scoped>
.CheerUp{
	height: 100%;
  padding: 20px 35px;
		padding-bottom: 50px;
}
.haeder{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.title{
    font-size: 25px;
		margin-left: 10px;
	
}
.nv-btn-yellow{
	font-size: 13px;
	padding: 5px 10px;
}
.con-cheerup{
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin-top: 15px;
	
}
.con-list-cheerup{
		display: grid;
	grid-gap: 20px;
}
.profile{
	width: 60px;
	height: 60px;
}
.box-list-cheerup{
	// padding: 20px 20px;
	// background: rgb(235, 84, 84);
	display: grid;
	grid-template-columns:  1fr;
	grid-gap: 10px;
	color: #fff;
	
    align-items: center;
}
.name-profile{
	padding: 20px;
	border-radius: 10px;
}
.raking1{
	background: #eb5454;
}
.raking2{
	background: #E4803A;

}
.raking3{
	background: #F4BA40;
}
.raking4, .raking5{
	background: #1E2046;

}
.animou-img{
	display: flex;
	justify-content: center;
	align-content: center;
}
.animou-img img{
	    height: 400px;
}
</style>