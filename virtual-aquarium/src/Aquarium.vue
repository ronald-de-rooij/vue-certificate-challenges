<script setup>
  import Fish from "./Fish.vue"
  const props = defineProps(["fishes"])
</script>

<template>
  <div class="text-white h-screen aquarium relative">
    aa

    <Fish v-for="fish in props.fishes" :fish-type="fish" />
  </div>
</template>

<style scoped>
  .aquarium {
    background: url("bg.jpg") no-repeat;
  }
</style>
