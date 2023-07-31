<script setup>
  import { ref, computed, onMounted } from "vue"
  const props = defineProps(["fishType"])

  const randomTop = ref(Math.floor(Math.random() * 100))
  const randomLeft = ref(Math.floor(Math.random() * 100))

  const positionTop = computed(() => {
    if (randomTop.value < 5) {
      return "5%"
    }
    if (randomTop.value > 90) {
      return `calc(${randomTop.value} - 120px)`
    }
    return `${randomTop.value}%`
  })

  const positionLeft = computed(() => {
    if (randomLeft.value > 90) {
      return 90
    }
    return randomLeft.value
  })

  const directionImg = ref(1)

  const fishHealth = ref(50)

  onMounted(() => {
    let topBottom = "top"
    let leftRight = "left"

    setInterval(() => {
      fishHealth.value--

      if (randomTop.value < 90 && topBottom === "top") {
        randomTop.value++
      } else {
        topBottom = "bottom"
        if (randomTop.value > 5) {
          randomTop.value--
        } else {
          topBottom = "top"
        }
      }

      if (randomLeft.value < 90 && leftRight === "left") {
        directionImg.value = 1
        randomLeft.value++
      } else {
        leftRight = "right"
        directionImg.value = -1
        if (randomLeft.value > 5) {
          randomLeft.value--
        } else {
          leftRight = "left"
        }
      }
    }, 100)
  })

  function feedFish() {
    fishHealth.value = 50
  }
</script>

<template>
  <div
    class="fish-wrapper"
    :style="`top: ${positionTop}; left: ${positionLeft}%`"
    @click="feedFish"
  >
    <img
      :src="`${fishType.fish}.png`"
      :alt="fishType.fish"
      :style="`transform: scaleX(${directionImg});`"
    />
    <p>{{ fishType.name }}</p>
    <p>{{ fishHealth }}</p>
  </div>
</template>

<style scoped>
  .fish-wrapper {
    position: absolute;
    text-align: center;
  }
  img {
    max-width: 80px;
    display: inline-block;
    margin: 10px 20px;
  }
</style>
