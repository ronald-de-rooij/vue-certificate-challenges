<script setup>
  import FishForm from "./FishForm.vue"
  import Aquarium from "./Aquarium.vue"

  import { ref } from "vue"

  const fishesInAquarium = ref([])
  function addFishToAquarium(fish) {
    fishesInAquarium.value.push(fish)
  }
</script>

<template>
  <div class="flex">
    <div class="w-1/6 p-8">
      <FishForm @addFish="addFishToAquarium" />
    </div>
    <div class="w-5/6">
      <Aquarium :fishes="fishesInAquarium" />
    </div>
  </div>
</template>
