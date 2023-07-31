<script setup>
  import { ref, computed } from "vue"

  const total = ref("")
  const selected = ref("")

  function reset() {
    total.value = ""
  }

  function selectedNumber(number) {
    total.value += number
  }

  function selectedDot() {
    if (total.value.substr(total.value.length - 1) === ".") return
    total.value += "."
  }

  const beforeReduce = ref()
  function selectedReduce() {
    beforeReduce.value = total.value
    total.value = ""
    selected.value = "reduce"
  }

  const beforeMultiply = ref()
  function selectedMultiply() {
    beforeMultiply.value = total.value
    total.value = ""
    selected.value = "multiply"
  }

  const displayCalc = computed(() => {
    let display = total.value
    if (selected.value === "reduce") {
      return `- ${display}`
    }
    if (selected.value === "multiply") {
      return `X ${display}`
    }

    return display
  })

  function calculate() {
    if (selected.value === "reduce") {
      total.value = beforeReduce.value - total.value
    }
    if (selected.value === "multiply") {
      total.value = beforeMultiply.value * total.value
    }

    selected.value = ""
  }
</script>

<template>
  <div class="mx-auto w-72 h-full items-center flex">
    <div class="bg-gray-600 w-full p-4 rounded-md">
      <div class="bg-green-800 p-4 text-right mb-2">
        {{ displayCalc }}
      </div>

      <div class="flex justify-between text-white mb-2">
        <div class="icon" @click="reset()">C</div>
        <div class="icon">÷</div>
      </div>

      <div class="flex justify-between mb-2">
        <div class="icon" @click="selectedNumber('7')">7</div>
        <div class="icon" @click="selectedNumber('8')">8</div>
        <div class="icon" @click="selectedNumber('9')">9</div>
        <div class="icon" @click="selectedMultiply()">X</div>
      </div>

      <div class="flex justify-between mb-2">
        <div class="icon" @click="selectedNumber('4')" @keyup="selectedNumber(event)">4</div>
        <div class="icon" @click="selectedNumber('5')">5</div>
        <div class="icon" @click="selectedNumber('6')">6</div>
        <div class="icon" @click="selectedReduce()">-</div>
      </div>

      <div class="flex justify-between mb-2">
        <div class="icon" @click="selectedNumber('1')">1</div>
        <div class="icon" @click="selectedNumber('2')">2</div>
        <div class="icon" @click="selectedNumber('3')">3</div>
        <div class="icon">+</div>
      </div>

      <div class="flex justify-between mb-2">
        <div class="icon" @click="selectedNumber('0')">0</div>
        <div class="icon ml-auto mr-2" @click="selectedDot()">.</div>
        <div class="icon" @click="calculate()">=</div>
      </div>
    </div>
  </div>
</template>

<style>
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    width: 56px;
    height: 56px;
    background-color: rgb(31 41 55 / var(--tw-bg-opacity));
    color: #fff;
    font-size: 24px;
  }
</style>
