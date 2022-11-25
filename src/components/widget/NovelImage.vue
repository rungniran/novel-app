<template>
<!-- <picture> -->
  <!-- <source type="image/webp"  :srcset="image  +'?quality=auto&format=webp'"/> -->
  <!-- <source type="image/jpeg" :srcset="image  +'?quality=auto&format=webp'"> +'?quality=auto&format=webp' -->
  <img class="img-shape" :src="image"   @error="pictureLoadingError" :alt="name"  width="100%" />
<!-- </picture> -->
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: '',
    },
    name:{
      type: String,
      default: '',
    },
    datatype:{
      type: String,
      default: 'Novel',
    }
  },
  methods:{
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    pictureLoadingError(e){
      this.onerror=null;
      // console.log( e.currentTarget.parentNode.children[0].srcset = this .$path.image('loading.png') );
      if(this.datatype === 'Novel'){
        
        // e.currentTarget.parentNode.children[0].srcset = this .$path.image('loading.png') 
        e.target.src = this .$path.image('loading.png') 
      }else if(this.datatype === 'Banner'){
        //  e.currentTarget.parentNode.children[0].srcset = this.$path.image('trsd.jpg')
        e.target.src = this.$path.image('trsd.jpg')
      }
       
       
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    pictureLoadingErrorSet(e){
      e.target.srcset = this .$path.image('loading.png')
    }
  },
}
</script>
<style scoped>
.img-shape{
  border-radius: 7px;
}
</style>
