<template>
	<div id="NovelCropper">
	<div class="size">	
	<!-- resize =	{{size.size}} {{size.value}}<br>

	defail =	{{size_defail.size}} {{size_defail.value}} -->
  <!-- {{imgupdata}} -->
	</div>
    <span id="NovelCropper" v-if="img != ''">
		<div class="con-zoom">
			<div @click="zoom" class="zoom"><i class="fas fa-search-plus"></i></div>
			<div @click="move" class="move"><i class="fas fa-search-minus"></i></div>
		</div>
		<cropper
			ref="cropper"
			class="cropper"
			:src="img"
			:auto-zoom="true"
			:default-size="defaultSize"
			image-restriction="stencil"
			:stencil-size="{
				width: 	500,
				height: 707
			}"
			:stencil-props="{
				aspectRatio: 500/707,
				scalable: false, 
				movable: false,

			}"
			@change="change"
		/>

		
        <div  class="reset" @click="reset">ลบ</div>
        </span>
        <span class="NovelCropper-input" v-else>
		<input  type="file" class="file" @change="previewFiles" accept="image/png, image/jpeg">
        <img src="https://novelkingdom.co/images/use-file-img.png" class="camera">
        </span>

		<!-- <img :src="test"> scalable: false, movable: false,	handlers: {},-->
    <!-- <img :src="tests"> -->
	</div>

</template>
<script >
import Vue from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default Vue.extend({
  name:"NovelCropper",
  components: {
		Cropper,

	},
  props:{
    imgupdata:{
			type:String,
			defail:'https://119.59.97.111/storage/novel_image/BB16BA7F-2D9A-428F-9CD7-68231B086EAB.png'
		}
	},
	data: () => {
		return {
			img: '',
			test: '',
			size:'',
			size_defail:'',
			tests:''
			
		};
   },
	methods: {
		change({ canvas }) {
			this.test = canvas.toDataURL()
			const date = new Date
			var file = this.dataURLtoFile(canvas.toDataURL(),Date.parse(date)+'.png');
			this.resize(file)
			// console.log(file);
			// this.$emit("imgCropper" , file)
		},
		defaultSize({ imageSize, visibleArea }) {
			return {
				width: (visibleArea || imageSize).width,
				height: (visibleArea || imageSize).height,
			};
		},
		previewFiles(event) {
			var reader = new FileReader()
			this.size_defail = this.$filter.formatBytes(event.target.files[0].size)
			reader.readAsDataURL(event.target.files[0])
			reader.onload = () => {
				this.img = reader.result
			};
		},
		resize(file){
			  const MAX_WIDTH = 300;
        const MAX_HEIGHT = 507;
				const MIME_TYPE = "image/png";
				const QUALITY = 0.7;
				const blobURL = URL.createObjectURL(file);
				const img = new Image();
				img.src = blobURL;
				img.onload =  () => {
				// URL.revokeObjectURL(this.src);
				const [newWidth, newHeight] = this.calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
				const canvas = document.createElement("canvas");
				canvas.width = newWidth;
				canvas.height = newHeight;
				const ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, newWidth, newHeight);
				canvas.toBlob(
					(blob) => {
						this.bade64(blob)
					},
					MIME_TYPE,
					QUALITY
				);
			};
		},

		bade64(blob){
			var file = new File([blob], "name", {type:'image/png'});
			this.size = this.$filter.formatBytes(file.size)
			var reader = new FileReader()
		  reader.readAsDataURL(blob)
			reader.onload = () => {
				this.tests =reader.result
				var file = this.dataURLtoFile(reader.result,"dffddf"+'.png');
				this.size = this.$filter.formatBytes(file.size)
				this.$emit("imgCropper" , file)
				
			};
		},

		calculateSize(img, maxWidth, maxHeight) {
			let width = img.width;
			let height = img.height;

			// calculate the width and height, constraining the proportions
			if (width > height) {
				if (width > maxWidth) {
					height = Math.round((height * maxWidth) / width);
					width = maxWidth;
				}
			} else {
				if (height > maxHeight) {
					width = Math.round((width * maxHeight) / height);
					height = maxHeight;
				}
			}
			return [width, height];
    },

		dataURLtoFile(dataurl, filename) {
			var arr = dataurl.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);
			while(n--){
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new File([u8arr], filename, {type:mime});
		},
		

		reset(){
			this.img = ''
		},
		zoom() {
			this.$refs.cropper.zoom(2);
		},
		move() {
			this.$refs.cropper.zoom(0.5);
		}
		
	},
});
</script>

<style>
#NovelCropper{
	height: 300px;
	width: 600px;
	position: relative;
	display: flex;
	justify-content: center;
}
.vue-advanced-cropper__background, .vue-advanced-cropper__foreground{
	background: #ffffff;
}
.vue-preview__wrapper {
	border-radius: 12px;
	border: 2px solid #F4BA40;
	overflow: hidden;
}
.cropper {
	position: relative;
	max-height: 500px;
	display: flex;
}
::-webkit-file-upload-button {
  display: none;
}
.file{
	background: #dfdfdf;
	width: 230px;
	cursor: pointer;
}
.reset{
	padding: 5px 10px;
	border-radius: 5px;
	color: #fff;
	background: #F4BA40;
	position: absolute;
	right: 0px;
	top: 0px;
	z-index: 1000;
	cursor: pointer;
}
.con-zoom{
	position: absolute;
	z-index: 2000;
	top: 120px;
	left: 200px;
}
.zoom, .move{
    cursor: pointer;
}
.camera{
    width: 40px;
    height: 40px;
    position: absolute;
    margin: auto;
    pointer-events: none;
    top: 120px;
}
.NovelCropper-input{
    height: 300px;
	width: 600px;
	position: relative;
	display: flex;
	justify-content: center;
}
.size{
	width: 200px;
	position: absolute;
	left: -140px;
	z-index: 100;
}

.vue-simple-handler {
    display: block;
    background: #f4ba40;
    height: 10px;
    width: 10px;
}
</style>
