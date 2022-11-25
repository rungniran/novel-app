<template>
<picture>
  <source type="image/webp" media="(max-width: 799px)" :srcset="image  +'?quality=auto&format=webp'" />
  <source type="image/jpeg" :srcset="image  +'?quality=auto&format=webp'">
  <img sizes="(max-width: 600px) 480px,800px" :src="image +'?quality=auto&format=webp'" :alt="name" loading="lazy" />
</picture>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: 'https://novelkingdom.co/loading.png',
    },
    name:{
      type: String,
      default: 'https://novelkingdom.co/loading.png',
    }
  },

  computed: {
    dataUrl() {
      const { width, height } = this.$attrs
      if (!width || !height) return ""

      // create a tiny png with matching aspect ratio as img
      const w = 100
      const canvas = document.createElement("canvas")
      canvas.width = w
      canvas.height = (height / width) * w

      return canvas.toDataURL()
    },
  },
}
</script>