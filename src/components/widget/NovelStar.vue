<template>
  <div class="NovelStar">
		<div v-if="rating === 0">
			<i class="fas fa-star "></i>
			<i class="fas fa-star "></i>
			<i class="fas fa-star "></i>
			<i class="fas fa-star "></i>
			<i class="fas fa-star "></i>
		</div>
		<div v-else-if="rating === 1">
			<i class="fas fa-star active"></i>
			<i class="fas fa-star "></i>
			<i class="fas fa-star "></i>
			<i class="fas fa-star "></i>
			<i class="fas fa-star "></i>
		</div>
		<div v-else-if="rating === 2">
			<i class="fas fa-star active"></i>
			<i class="fas fa-star active"></i>
			<i class="fas fa-star "></i>
			<i class="fas fa-star "></i>
			<i class="fas fa-star "></i>
		</div>
		<div v-else-if="rating === 3">
			<i class="fas fa-star active"></i>
			<i class="fas fa-star active"></i>
			<i class="fas fa-star active"></i>
			<i class="fas fa-star "></i>
			<i class="fas fa-star "></i>
		</div>
		<div  v-else-if="rating === 4">
			<i class="fas fa-star active"></i>
			<i class="fas fa-star active"></i>
			<i class="fas fa-star active"></i>
			<i class="fas fa-star active"></i>
			<i class="fas fa-star "></i>
		</div>
		<div v-else-if="rating === 5">
			<i class="fas fa-star active"></i>
			<i class="fas fa-star active"></i>
			<i class="fas fa-star active"></i>
			<i class="fas fa-star active"></i>
			<i class="fas fa-star active"></i>
		</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  name: 'NovelStar',
   props: {
    rating: Number
   },
});
</script>
<style lang="scss" scoped>
.NovelStar {
  padding: 3px 0px;
  display: flex;
}
.fa-star{
    color: #8e8e8e;
}
.active {
  color: #f4ba40;
}

</style>
