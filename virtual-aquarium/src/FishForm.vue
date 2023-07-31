<script setup>
  import { ref } from "vue"

  const fishes = [
    "golden-purple-fish",
    "goldfish",
    "guppie",
    "tropical-fish",
    "tuna",
  ]

  const selectedFish = ref("")
  const fishName = ref("")

  const emit = defineEmits(["addFish"])
  function addFish() {
    emit("addFish", { fish: selectedFish.value, name: fishName })
  }
</script>

<template>
  <h1 class="text-white text-2xl font-bold">Fish Type</h1>
  <img
    v-for="fish in fishes"
    :src="`${fish}.png`"
    :alt="fish"
    @click="selectedFish = fish"
    :class="{ active: selectedFish === fish }"
  />

  <h1 class="text-white text-2xl font-bold">Name</h1>
  <input v-model="fishName" aria-label="fishName" class="p-4 w-full" />

  <button @click="addFish()" class="p-2 bg-blue-500">Add fish</button>
</template>

<style scoped>
  img {
    max-width: 80px;
    display: inline-block;
    margin: 10px 20px;
  }

  img:hover {
    cursor: pointer;
  }

  img.active {
    filter: drop-shadow(0 0 10px rgba(0, 191, 255, 0.8));
  }
</style>
