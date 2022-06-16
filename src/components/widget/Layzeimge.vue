<template>
  <img
    :src="src ? src : 'https://novelkingdom.co/loading.png'"
    :alt="$attrs.alt || ''"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: 'https://novelkingdom.co/loading.png',
    },
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